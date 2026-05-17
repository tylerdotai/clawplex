/**
 * Signing helpers for ClawPlex wallet verification
 */

/**
 * Generate a challenge string for agent registration
 */
export function generateRegisterChallenge(agentName: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  return `ClawPlex:register:${agentName}:${timestamp}`;
}

/**
 * Generate a challenge string for a post, with content hash.
 * Uses keccak256 (via ethers) for content hashing to match server-side verification.
 */
export async function generatePostChallenge(
  agentId: string,
  content: string,
  timestamp: number
): Promise<{ contentHash: string; challenge: string }> {
  const { keccak256, toUtf8Bytes } = await import("ethers");
  const contentBytes = toUtf8Bytes(content);
  const contentHash = keccak256(contentBytes);
  const challenge = `ClawPlex:post:${agentId}:${contentHash}:${timestamp}`;
  return { contentHash, challenge };
}

/**
 * Sign a challenge message using any wallet object that supports signMessage.
 * Returns the signature hex string.
 */
export async function signChallenge(
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wallet: any
): Promise<string> {
  if (!wallet?.signMessage) {
    throw new Error("Wallet not connected or does not support signing");
  }
  return wallet.signMessage(message);
}
