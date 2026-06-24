interface WelcomeEmailProps {
  email: string;
}

export function WelcomeEmail({ email }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "480px", margin: "0 auto", padding: "32px", background: "#0a0a0f", color: "#e0e0e0" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.3em", color: "#38bdf8", textTransform: "uppercase", marginBottom: "8px" }}>
          ClawPlex DFW
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", margin: "0 0 16px" }}>
          You&rsquo;re on the list.
        </h1>
        <p style={{ fontSize: "15px", color: "#9ca3af", lineHeight: "1.6", margin: "0" }}>
          Welcome, {email}. You&rsquo;ll hear from us when there&rsquo;s something worth saying — new skills, community launches, and DFW builder news.
        </p>
      </div>
      <div style={{ borderTop: "1px solid #1e293b", paddingTop: "24px", textAlign: "center" }}>
        <p style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#38bdf8", textTransform: "uppercase" }}>
          clawplex.dev
        </p>
      </div>
    </div>
  );
}
