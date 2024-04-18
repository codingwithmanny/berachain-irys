// Imports
// ========================================================
import { QUERY_HOLDERS } from "../../../../server/db/queries/holders";
import { config } from "dotenv";
import {
  createPublicClient,
  createWalletClient,
  http,
  formatUnits,
} from "viem";
import { berachainTestnet } from "viem/chains";
import abi from "../../../../utils/abi";
import Irys from "@irys/sdk";
import { getThreshold } from "../../../../utils/helpers";
import { privateKeyToAccount } from "viem/accounts";

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
    providerUrl: berachainTestnet.rpcUrls.default.http[0],//`${process.env.CHAIN_RPC_URL}`, // Optional RPC provider URL, only required when using Devnet
  },
});

/**
 * @dev main client for read operations
 */
const publicClient = createPublicClient({
  chain: berachainTestnet,
  transport: http(),
});

/**
 * @dev main client for write operations to contract
 */
const walletClient = createWalletClient({
  chain: berachainTestnet,
  transport: http(),
});

// Endpoints
// ========================================================
/**
 * UPDATE information regarding wallet holder is not already in the database
 * @param request
 */
export const PUT = async (
  _request: Request,
  { params }: { params: { walletAddress: string } }
) => {
  try {
    const { walletAddress } = params;
    const response = await QUERY_HOLDERS.FIND({
      key: "walletAddress",
      value: walletAddress,
    });

    // If doesn't exist, update database
    if (!response) {
      // 1. Confirm balance
      const resultBalanceOf = await publicClient.readContract({
        address:
          `${process.env.NEXT_PUBLIC_BHONEYNFT_CONTRACT_ADDRESS}` as `0x${string}`,
        abi,
        functionName: "balanceOf",
        args: [walletAddress],
      });
      const balance = parseInt((resultBalanceOf as bigint).toString());
      console.log({ balance });

      if (balance === 0) {
        throw Error("Balance of walletAddress is zero.");
      }

      // 2. Get tokenId
      const resultTokenId = await publicClient.readContract({
        address:
          `${process.env.NEXT_PUBLIC_BHONEYNFT_CONTRACT_ADDRESS}` as `0x${string}`,
        abi,
        functionName: "nftOwned",
        args: [walletAddress],
      });

      const tokenId = parseInt((resultTokenId as bigint).toString());
      console.log({ tokenId });

      // 3. Get bHoney Amount
      const resultBHoney = await publicClient.readContract({
        address:
          `${process.env.NEXT_PUBLIC_BHONEY_CONTRACT_ADDRESS}` as `0x${string}`,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      });
      const bHoneyAmount = parseInt(formatUnits(resultBHoney, 18));
      const mutableRefImageUrl = getThreshold(bHoneyAmount);
      console.log({
        bHoneyAmount,
      });

      // 4. Create new tokenURI with mutable ref
      const tokenURIJSON = {
        name: `BHoneyNFT #${tokenId}`,
        symbol: "BHNFT",
        description: "The magic unfolds when a bear and llama do what's untold",
        image: `https://gateway.irys.xyz/${mutableRefImageUrl.IMGURL}`,
      };
      const tokenURI = await irys.upload(JSON.stringify(tokenURIJSON), { tags: [{ name: "Content-Type", value: "application/json" }]});
      console.log({ tokenURI: tokenURI.id });

      // 5. Set contract token to new URI
      await walletClient.writeContract({
        address: `${process.env.NEXT_PUBLIC_BHONEYNFT_CONTRACT_ADDRESS}` as `0x${string}`,
        abi,
        functionName: 'updateTokenURI',
        args: [tokenId, tokenURI.id],
        account: privateKeyToAccount(`${process.env.WALLET_PRIVATE_KEY}` as `0x${string}`)
      });

      return Response.json({
        data: await QUERY_HOLDERS.CREATE({
          walletAddress,
          nftId: `${tokenId}`,
          bHoney: `${bHoneyAmount}`,
          mutablelUrl: tokenURI.id
        }),
      });
    }

    return Response.json({ data: response });
  } catch (error: any) {
    return Response.json(
      { erorr: error?.message ?? "Unknown error." },
      { status: 404 }
    );
  }
};
