"use client";

// Imports
// ========================================================
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { FigetSpinner } from "../Icons";

// Components
// ========================================================
export default function Loader({ status = "" }) {
  // Render
  return (
    <>
      <span className="flex space-x-2 items-center">
      <FigetSpinner className=" animate-spin" /> <span>{status}</span>
      </span>
    </>
  );
}
