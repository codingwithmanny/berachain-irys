// Imports
// ========================================================
import Irys from "@irys/sdk";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

// Main Script
// ========================================================
config();

/**
 * 
 */
const IRYS_GATEWAY_URI = 'https://gateway.irys.xyz/';

// Main Script
// ========================================================
/**
 * @dev Main upload script
 */
const main = async () => {
  console.group("main()");

  // Get all files and calculate size
  const allFiles = fs.readdirSync(path.join(__dirname, "../assets"));
  console.log({ allFiles });

  // Get file and its size
  let fileSizes = 0;
  for (const key in allFiles) {
    const filePath = path.join(__dirname, "../assets", allFiles[key]);
    const stats = fs.statSync(filePath);
    fileSizes += stats.size;
  }
  console.log({ fileSizes });

  // Irys Config
  const irys = new Irys({
    url: `${process.env.IRYS_NODE}`, // URL of the node you want to connect to
    token: `${process.env.IRYS_TOKEN}`, // Token used for payment
    key: `${process.env.WALLET_PRIVATE_KEY}`, // Private key used for signing transactions and paying for uploads
    config: {
      providerUrl: `${process.env.CHAIN_RPC_URL}`, // Optional RPC provider URL, only required when using Devnet
    },
  });
  console.log(`Connected to Irys from ${irys.address}`);

  // Get price needed in `$BERA`
  const price = irys.utils.fromAtomic(await irys.getPrice(fileSizes));
  console.log({
    price: `${price} $${irys.token}`,
  });

  // Get balance
  let currentBalance = irys.utils.fromAtomic(await irys.getLoadedBalance());
  console.log({
    currentBalance: `${currentBalance} $${irys.token}`,
  });

  // If needed fund the Irys node
  if (currentBalance.isLessThan(price)) {
    // Fund the Irys node
    console.log("Not enough balance, funding node...");
    const fundTx = await irys.fund(irys.utils.toAtomic(price));
    console.log(`Successfully funded '${irys.utils.fromAtomic(fundTx.quantity)}' $${irys.token}`);
    currentBalance = irys.utils.fromAtomic(await irys.getLoadedBalance());
    console.log({
      currentBalance: `${currentBalance} $${irys.token}`,
    });
  }

  // Upload files
  console.log("Uploading files...");
  const uploadFiles = [];
  for (const key in allFiles) {
    const filePath = path.join(__dirname, "../assets", allFiles[key]);
    // Irys also provides methods for uploading folders and pure binary data
    const receipt = await irys.uploadFile(filePath, {
      // Add optional tags
      // Tags are indexed and are queryable using the Irys query package
      // https://docs.irys.xyz/developer-docs/querying/query-package
      tags: [
        {
          name: "application-id",
          value: "Irys + Berachain",
        },
      ],
    });

    // Files are instantly available from the Irys gateway
    const file = `${IRYS_GATEWAY_URI}${receipt.id}`;
    uploadFiles.push(file);
    console.log(file);
  }

  // Create mutable reference
  const irysReceipt = await irys.upload(JSON.stringify({
    name: "BHoneyNFT",
    symbol: "BHNFT",
    description: "The magic unfolds when a bear and llama do what's untold",
    image: `${uploadFiles[0]}`
  }), { tags: [{ name: "Content-Type", value: "application/json" }] });

  console.log({ mutableRefURI: `${IRYS_GATEWAY_URI}${irysReceipt.id}` });

  console.groupEnd();
};

// Init Script
// ========================================================
main()
  .then(() => {
    console.log("Script complete.");
  })
  .catch((error) => {
    console.error({ error });
  });