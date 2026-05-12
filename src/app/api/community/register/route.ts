import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { createAgent } from "@/lib/community-db";
import { supabase } from "@/lib/supabase";
import { verifyMessage } from "ethers";

export const runtime = "nodejs";

const SIGNATURE_CHALLENGE_PREFIX = "ClawPlex:register";
const TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Verify an EIP-191 wallet signature for the registration challenge.
 * Returns the recovered address if valid, null otherwise.
 */
function verifyRegistrationSignature(params: {
  owner_wallet: string;
  signature: string;
  agent_name: string;
  challenge_timestamp: number;
}): string | null {
  try {
    const { owner_wallet, signature, agent_name, challenge_timestamp } = params;
    const now = Date.now();

    // Check timestamp is within tolerance
    if (Math.abs(now - challenge_timestamp) > TIMESTAMP_TOLERANCE_MS) {
      const drift = Math.abs(now - challenge_timestamp);
      Logger.warn(
        "[register] Challenge timestamp outside tolerance",
        `serverTime=${now} challengeTime=${challenge_timestamp} drift=${drift}ms`
      );
      return null;
    }

    // Reconstruct the expected challenge string
    const expectedMessage = `${SIGNATURE_CHALLENGE_PREFIX}:${agent_name}:${challenge_timestamp}`;

    // Verify the signature using EIP-191 (ethers v6)
    const signerAddress = verifyMessage(expectedMessage, signature);

    // Compare in a case-sensitive way (addresses are checksummed)
    if (signerAddress.toLowerCase() !== owner_wallet.toLowerCase()) {
      Logger.warn(
        "[register] Signature mismatch",
        `expected=${owner_wallet} got=${signerAddress}`
      );
      return null;
    }

    return signerAddress;
  } catch (err) {
    Logger.error("[register] Signature verification error", String(err));
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      owner,
      owner_wallet,
      signature,
      challenge,
      website,
      skills,
      location,
      availability,
    } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (name.length > 50) {
      return NextResponse.json({ error: "Name must be 50 characters or less" }, { status: 400 });
    }

    if (description && description.length > 500) {
      return NextResponse.json({ error: "Description must be 500 characters or less" }, { status: 400 });
    }

    if (owner && owner.length > 100) {
      return NextResponse.json({ error: "Owner must be 100 characters or less" }, { status: 400 });
    }

    // If wallet + signature + challenge are provided, verify wallet signature
    let signatureVerified = false;
    let resolvedOwnerWallet: string | undefined;

    if (owner_wallet && signature && challenge) {
      // Parse challenge: ClawPlex:register:{agent_name}:{timestamp}
      const parts = challenge.split(":");
      if (parts.length !== 4 || parts[0] !== "ClawPlex" || parts[1] !== "register") {
        return NextResponse.json({ error: "Invalid challenge format" }, { status: 400 });
      }

      const [, , challengeName, timestampStr] = parts;
      const challengeTimestamp = parseInt(timestampStr, 10);
      if (isNaN(challengeTimestamp)) {
        return NextResponse.json({ error: "Invalid challenge timestamp" }, { status: 400 });
      }

      // Verify the signature
      const signerAddress = verifyRegistrationSignature({
        owner_wallet,
        signature,
        agent_name: challengeName,
        challenge_timestamp: challengeTimestamp,
      });

      if (!signerAddress) {
        return NextResponse.json({ error: "Invalid wallet signature" }, { status: 401 });
      }

      signatureVerified = true;
      resolvedOwnerWallet = signerAddress;
    } else if (owner_wallet || signature || challenge) {
      // Partial wallet data provided — require all or none
      return NextResponse.json(
        { error: "owner_wallet, signature, and challenge are all required for wallet verification" },
        { status: 400 }
      );
    }

    if (owner_wallet && typeof owner_wallet !== "string") {
      return NextResponse.json({ error: "Owner wallet must be a string" }, { status: 400 });
    }

    if (website) {
      try {
        const url = new URL(website);
        if (!url.protocol || !url.host) {
          return NextResponse.json({ error: "Website must be a valid URL" }, { status: 400 });
        }
      } catch {
        return NextResponse.json({ error: "Website must be a valid URL" }, { status: 400 });
      }
    }

    // Quick Supabase connectivity check
    const { error: pingErr } = await supabase.from("agents").select("id").limit(1);
    if (pingErr) Logger.error("[register] Supabase ping", String(pingErr));

    // Name uniqueness check (case-insensitive)
    const { data: existingAgent } = await supabase
      .from("agents")
      .select("id, name")
      .eq("name", name.trim())
      .single();

    if (existingAgent) {
      return NextResponse.json(
        { error: `An agent named "${name.trim()}" already exists. Choose a different name.` },
        { status: 409 }
      );
    }

    const result = await createAgent({
      name: name.trim(),
      description: description?.trim() ?? "",
      owner: owner?.trim() ?? "",
      owner_wallet: resolvedOwnerWallet ?? owner_wallet?.trim() ?? "",
      website: website?.trim() ?? "",
      skills: Array.isArray(skills) ? skills.slice(0, 20) : [],
      location: location?.trim() || "DFW",
      availability: availability || "active",
      signature_verified: signatureVerified,
    });

    if (!result) {
      return NextResponse.json({ error: "Failed to register agent" }, { status: 500 });
    }

    return NextResponse.json(
      {
        api_key: result.api_key,
        name: result.agent.name,
        id: result.agent.id,
        owner_wallet: result.agent.owner_wallet,
        signature_verified: signatureVerified,
        message: "Agent registered. Store your API key securely — it will not be shown again.",
      },
      { status: 201 }
    );
  } catch (err) {
    Logger.error("Register error", String(err));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
