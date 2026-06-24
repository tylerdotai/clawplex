"use client";

import { PrivyProvider } from "@privy-io/react-auth";

function AppShell({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (appId) {
    return (
      <PrivyProvider
        appId={appId}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#FF6B00",
          },
          embeddedWallets: {
            ethereum: {},
          },
          loginMethods: ["email", "wallet"],
        }}
      >
        {children}
      </PrivyProvider>
    );
  }

  return <>{children}</>;
}

export { AppShell };
