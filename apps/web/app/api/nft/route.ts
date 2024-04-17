// Imports
// ========================================================
// import Irys from "@irys/sdk";
// import { createPublicClient, createWalletClient, http, formatUnits } from "viem";
// import { z } from "zod";
import { QUERY_HOLDERS } from "../../../server/db/queries/holders";
import { config } from "dotenv";
// import { berachainTestnet } from "viem/chains";
// import { getThreshold } from "../../../utils/helpers";
// import abi from "../../../utils/abi";
// import { privateKeyToAccount } from "viem/accounts";
import { type NextRequest } from "next/server";

// Config
// ========================================================
config();

// /**
//  * @dev validation schema for zod
//  */
// const schema = z.object({
//   walletAddress: z.string().startsWith('0x'),
//   tokenId: z.number().gt(-1)
// });

// /**
//  * @dev initiate new irys instance
//  */
// const irys = new Irys({
//   url: `${process.env.IRYS_NODE}`,
//   token: `${process.env.IRYS_TOKEN}`,
//   key: `${process.env.WALLET_PRIVATE_KEY}`,
//   config: {
//     providerUrl: `${process.env.CHAIN_RPC_URL}`, // Optional RPC provider URL, only required when using Devnet
//   },
// });

// /**
//  * 
//  */
// const publicClient = createPublicClient({
//   chain: berachainTestnet,
//   transport: http(),
// });

// /**
//  * 
//  */
// const walletClient = createWalletClient({
//   chain: berachainTestnet,
//   transport: http(),
// });

// Endpoints
// ========================================================
/**
 * @dev LIST all holders
 * @param request 
 */
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get('walletAddress');
  const holders = await QUERY_HOLDERS.LIST(walletAddress
    ? {
      filterKey: 'walletAddress',
      filterValue: walletAddress
    }
    : undefined
  );

  return Response.json({
    data: holders
  });
};

// /**
//  * @dev CREATE
//  * @param request
//  */
// export const POST = async (request: Request) => {
//   // 1. Validate payload
//   const payload = await request.json();
//   const validation = await schema.safeParseAsync(payload);

//   if (!validation.success) {
//     return Response.json({ error: validation.error.issues }, { status: 400 });
//   }

//   // 2. Get walletAddress and tokenId
//   const { walletAddress, tokenId } = payload;

//   try {
//     // 3. Retrieve nft holder 
//     let nftHolder: any = await QUERY_HOLDERS.FIND({
//       key: "walletAddress",
//       value: walletAddress,
//     });

//     // 4. Get bHoney Amount
//     const result = await publicClient.readContract({
//       address: `${process.env.NEXT_PUBLIC_BHONEY_CONTRACT_ADDRESS}` as `0x${string}`,
//       abi: [{
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "owner",
//             "type": "address"
//           }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       }],
//       functionName: 'balanceOf',
//       args: [walletAddress]
//     });
//     const bHoneyAmount = parseInt(formatUnits(result, 18));

//     // 5. Get updated MutableRef
//     const mutableRefImageUrl = getThreshold(bHoneyAmount).IMGURL;

//     // 6. Get updated MutableRef
//     const mutableRefJSON = await (await fetch(`https://gateway.irys.xyz/mutable/${nftHolder.mutablelUrl}`)).json();
//     // If images don't match based on bHoney amount update mutable ref and databae
//     if (!mutableRefJSON.image.endsWith(`${mutableRefImageUrl}`)) {
//       console.log({ index: mutableRefJSON.image.endsWith(`${mutableRefImageUrl}`) })
//       console.log({ ref: nftHolder.mutablelUrl });
//       // 6a. Update Irys
//       await irys.upload(JSON.stringify({
//         name: `BHoneyNFT #${tokenId}`,
//         symbol: "BHNFT",
//         description: "The magic unfolds when a bear and llama do what's untold",
//         image: `https://gateway.irys.xyz/${mutableRefImageUrl}`,
//       }), { tags: [{ name: "Content-Type", value: "application/json" }, { name: "Root-TX", value: nftHolder.mutablelUrl }] });

//       // 6b. Update database
//       await QUERY_HOLDERS.UPDATE(
//         nftHolder.id,
//         {
//           bHoney: `${bHoneyAmount}`,
//         });
//     }

//     return Response.json({ data: { walletAddress, tokenId } });
//   } catch (error: any) {
//     return Response.json({ erorr: error?.message ?? 'Unknown error.' }, { status: 400 });
//   }
// };