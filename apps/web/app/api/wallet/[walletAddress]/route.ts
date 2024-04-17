// Imports
// ========================================================
import { QUERY_HOLDERS } from "../../../../server/db/queries/holders";
import { config } from "dotenv";
import { createPublicClient, http, formatUnits } from "viem";
import { berachainTestnet } from "viem/chains";
// import { getThreshold } from "../../../utils/helpers";
import abi from "../../../../utils/abi";
import { privateKeyToAccount } from "viem/accounts";

// Config
// ========================================================
config();

/**
 * 
 */
const publicClient = createPublicClient({
  chain: berachainTestnet,
  transport: http(),
});

// Endpoints
// ========================================================
/**
 * UPDATE information regarding wallet holder is not already in the database
 * @param request
 */
export const PUT = async (_request: Request, { params }: { params: { walletAddress: string } }) => {
  try {
    const { walletAddress } = params;
    const response = await QUERY_HOLDERS.FIND({ key: 'walletAddress', value: walletAddress });

    // If doesn't exist, update database
    if (!response) {
      // 1. Confirm balance
      const resultBalanceOf = await publicClient.readContract({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` as `0x${string}`,
        abi,
        functionName: 'balanceOf',
        args: [walletAddress]
      });
      const balance = parseInt((resultBalanceOf as bigint).toString());
      console.log({ balance });

      if (balance === 0) {
        throw Error('Balance of walletAddress is zero.')
      }
      // 2. Get tokenId
      const resultTokenId = await publicClient.readContract({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` as `0x${string}`,
        abi,
        functionName: 'nftOwned',
        args: [walletAddress]
      });

      const tokenId = parseInt((resultTokenId as bigint).toString());
      console.log({ tokenId });

      // 3. Get tokenURI mutable ref
      const resultTokenURI =  await publicClient.readContract({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` as `0x${string}`,
        abi,
        functionName: 'tokenURI',
        args: [tokenId]
      });

      const tokenURI = resultTokenURI as string;
      console.log({ tokenURI });

      // 4. Get bHoney Amount
      const resultBHoney = await publicClient.readContract({
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
        args: [walletAddress as `0x${string}`]
      });
      const bHoneyAmount = parseInt(formatUnits(resultBHoney, 18));

      console.log({
        bHoneyAmount
      });

      return Response.json({ data: await QUERY_HOLDERS.CREATE({
        walletAddress,
        nftId: `${tokenId}`,
        bHoney: `${bHoneyAmount}`,
        mutablelUrl: tokenURI.replace(`${process.env.IRYS_BASE_URL}`, '')
      })
      });
    }

    return Response.json({ data: response });
  } catch (error: any) {
    return Response.json({ erorr: error?.message ?? 'Unknown error.' }, { status: 404 });
  }
};
