// Imports
// ========================================================
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { config } from "dotenv";

// Config
// ========================================================
config();

// Module
// ========================================================
const BHoneyNFTModule = buildModule("BHoneyNFTModule", (m) => {
  // Deploy contract
  const contract = m.contract("BHoneyNFT", [`${process.env.CONTRACT_BASE_URL}`, `${process.env.CONTRACT_DEFAULT_TX_ID}`]);

  return { contract };
});

// Exports
// ========================================================
export default BHoneyNFTModule;
