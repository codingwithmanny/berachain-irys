"use client";

// Imports
// ========================================================
import {
  useConnectModal,
  useAccountModal,
} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

// Components
// ========================================================
export default function Connect() {
  // Hooks
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount();

  // Render
  return (
    <>
      {openConnectModal ? (
        <button onClick={openConnectModal} type="button">
          Connect Wallet
        </button>
      ) : null}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          {address 
            ? `Wallet Connected: ${address.slice(0,6)}...${address.slice(-4)}`
            : null}
        </button>
      )}
    </>
  );
}
