// Imports
// ========================================================
import Irys from "@irys/sdk";
import { QUERY_HOLDERS } from "../../../../server/db/queries/holders";
import { createPublicClient, http, formatUnits } from "viem";
import { berachainTestnet } from "viem/chains";
import { config } from "dotenv";
import { getThreshold } from "../../../../utils/helpers";

// Config
// ========================================================
config();

/**
 * @dev initiate new irys instance
 */
const irys = new Irys({
  url: `${process.env.IRYS_NODE}`,
  token: `${process.env.IRYS_TOKEN}`,
  key: `${process.env.WALLET_PRIVATE_KEY}`,
  config: {
    providerUrl: `${process.env.CHAIN_RPC_URL}`, // Optional RPC provider URL, only required when using Devnet
  },
});

/**
 * @dev viem public client
 */
const publicClient = createPublicClient({
  chain: berachainTestnet,
  transport: http(),
});

// Endpoints
// ========================================================
/**
 * READ a specific holder information based on nftId
 * @param request
 */
export const GET = async (_request: Request, { params }: { params: { nftId: string } }) => {
  try {
    const { nftId } = params;
    const response = await QUERY_HOLDERS.FIND({ key: 'nftId', value: nftId });
    return Response.json({ data: response });
  } catch (error: any) {
    return Response.json({ erorr: error?.message ?? 'Unknown error.' }, { status: 404 });
  }
};

/**
 * UPDATE specific nft based on nftId, automatically updates information - MUST already be in database
 * @param request
 */
export const PUT = async (_request: Request, { params }: { params: { nftId: string } }) => {
  try {
    const { nftId } = params;

    // 1. Retrieve nft holder 
    const nftHolder = await QUERY_HOLDERS.FIND({
      key: "nftId",
      value: nftId,
    });

    if (!nftHolder) {
      throw Error('Nft not found.', { cause: 404 });
    }

    // 2. Get bHoney Amount
    const result = await publicClient.readContract({
      address: `${process.env.NEXT_PUBLIC_BHONEY_CONTRACT_ADDRESS}` as `0x${string}`,
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      functionName: 'balanceOf',
      args: [nftHolder.walletAddress as `0x${string}`]
    });
    const bHoneyAmount = parseInt(formatUnits(result, 18));
    console.log({ bHoneyAmount });

    // 3. Get updated MutableRef
    const mutableRefImageUrl = getThreshold(bHoneyAmount);

    // 4. Get updated MutableRef
    const mutableRefJSON = await (await fetch(`https://gateway.irys.xyz/mutable/${nftHolder.mutablelUrl}`)).json();
    // If images don't match based on bHoney amount update mutable ref and databae
    if (!mutableRefJSON.image.endsWith(`${mutableRefImageUrl.IMGURL}`)) {
      console.log({ mutableRefImageUrl });
      // 4a. Update Irys
      console.log('uploading...');
      console.log({ nftHolder });
      await irys.upload(JSON.stringify({
        name: `BHoneyNFT #${nftId}`,
        symbol: "BHNFT",
        description: "The magic unfolds when a bear and llama do what's untold",
        image: `https://gateway.irys.xyz/${mutableRefImageUrl.IMGURL}`,
      }), { tags: [{ name: "Content-Type", value: "application/json" }, { name: "Root-TX", value: nftHolder.mutablelUrl }] });
      console.log('done...');
      // 4b. Update database
      await QUERY_HOLDERS.UPDATE(
        nftHolder.id,
        {
          bHoney: `${bHoneyAmount}`,
        });
    }

    // Return updated information
    return Response.json({ data: `Nft #${nftId} updated.` });
  } catch (error: any) {
    return Response.json({ error: error?.message ?? 'Unknown error.' }, { status: error?.cause ?? 400 });
  }  
};