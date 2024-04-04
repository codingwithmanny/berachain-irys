// Imports
// ========================================================
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Provider
// ========================================================
export default function Rainbow({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <RainbowKitProvider>{children}</RainbowKitProvider>;
};