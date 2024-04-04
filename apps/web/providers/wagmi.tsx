'use client'

// Imports
// ========================================================
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { berachainTestnet } from 'wagmi/chains';

// Config
// ========================================================
const config = getDefaultConfig({
  appName: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_NAME}`,
  projectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`,
  chains: [berachainTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// Provider
// ========================================================
export default function Wagmi({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};
