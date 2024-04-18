"use client";

// Imports
// ========================================================
import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import Loader from "../Loader";
import abi from "../../utils/abi";
import NFTImage from "../NFTImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getThreshold } from "../../utils/helpers";

// Components
// ========================================================
export default function NFT() {
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { address, isConnected } = useAccount();
  // const [isLoading, setIsLoading] = useState(true);

  // Requests
  /**
   * @dev finds nfts with the specific wallet address
   */
  const bHoneyAPIList = useQuery({
    queryKey: ['bHoneyAPIList'],
    queryFn: async () => {
      const response = await fetch(`/api/nft?walletAddress=${address}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await response.json();
      if (!response.ok || !json?.data) {
        throw Error('Could not retrieve nfts.');
      }
      return json.data;
    },
    enabled: false,
    retry: false
  });

  /**
   * @dev Updates wallet information if not in the database
   */
  const bHoneyAPIWalletUpdate = useMutation({
    mutationFn: async (address: `0x${string}`) => {
      const response = await fetch(`/api/wallet/${address}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await response.json();
      if (!response.ok || !json?.data) {
        throw Error('Could not update wallet.');
      }
      return json.data;
    },
    onSuccess: () => {
      bHoneyAPIList.refetch();
    },
    retry: false,
  });

  /**
   * @dev Updates nft information once minted
   */
  const bHoneyAPINftUpdate = useMutation({
    mutationFn: async (nftId: number) => {
      const response = await fetch(`/api/nft/${nftId}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await response.json();
      if (!response.ok || !json?.data) {
        throw Error('Could not update nft.');
      }
      return json.data;
    },
    onSuccess: () => {
      bHoneyAPIList.refetch();
    },
    retry: false,
  });

  /**
   * @dev placeholder for contract writes
   */
  const { writeContractAsync: bHoneyNFTContractWrite } = useWriteContract();

  /**
   * @dev when a transaction hash is set to `hash` this will wait for the final tx receipt
   */
  const bHoneyNFTTxReceipt = useWaitForTransactionReceipt({
    hash,
  });
  
  /**
   * @dev handles all loading
  */
 const isLoading = bHoneyAPIList.isLoading || bHoneyAPIWalletUpdate.isPending || bHoneyAPINftUpdate.isPending || bHoneyNFTTxReceipt.isLoading;

 /**
  * @dev easy boolean to keep track if the user is already an nft holder
  */
 const isNftHolder = bHoneyAPIList?.data?.length > 0; //parseInt(`${bHoneyNFTContractReadBalanceOf.data?.toString()}`) > 0;

 /**
  * @dev 
  */
 const nftData = bHoneyAPIList?.data?.[0] ?? undefined;

  // Functions
  /**
   * @dev main minting function
   */
  const onClickMint = async () => {
    console.group('onClickMint');
    try {
      const hashResponse = await bHoneyNFTContractWrite({
        abi,
        address: `${process.env.NEXT_PUBLIC_BHONEYNFT_CONTRACT_ADDRESS}` as `0x${string}`,
        functionName: 'mint'
      });

      console.log({ hashResponse });
      // Set hash to for `useWaitForTransactionReceipt`
      setHash(hashResponse);

      // Retrieve 
    } catch (error: any) {
      console.error({ error });
      if (address) {
        bHoneyAPIWalletUpdate.mutate(address);
      }
    }
    console.groupEnd();
  };

  /**
   * @dev Updates nfts status based on bhoney tokens
   */
  const onClickUpdate = async () => {
    console.group('onClickUpdate');
    if (!address) return;
    try {
      bHoneyAPINftUpdate.mutate(nftData.nftId);
    } catch (error: any) {
      console.error(({ error }));
    }

    console.groupEnd();
  };

  // Hooks
  /**
   * 
   */
  useEffect(() => {
    if (!address || bHoneyAPIList.isLoading || bHoneyAPIList.data) return;
    bHoneyAPIList.refetch();
  }, [address]);

  /**
   * 
   */
  useEffect(() => {
    if (!hash || !bHoneyNFTTxReceipt.isSuccess || !address) return;
    bHoneyAPIWalletUpdate.mutate(address);
  }, [hash, bHoneyNFTTxReceipt.isSuccess]);

  // Render
  if (!isConnected) return null;

  return (
    <>
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div>
              {/* {JSON.stringify({ nftData })} */}
              <NFTImage isLoading={isLoading} tokenId={nftData?.nftId} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{!isNftHolder ? 'Berachain x Irys NFT' : `Berachain #${nftData?.nftId ?? ''}`}</td>
                </tr>
                <tr>
                  <th>Symbol</th>
                  <td>BHNFT</td>
                </tr>
                <tr>
                  <th>$bHoney Amount</th>
                  <td>{!isNftHolder ? '(Mint to find out)' : `${nftData?.bHoney?? ''}`}</td>
                </tr>
                <tr>
                  <th>Level</th>
                  <td>
                    {!isNftHolder
                      ? '(Mint to find out)'
                      : <code>{getThreshold(parseInt(nftData?.bHoney ?? '0')).LEVEL}</code>
                    }
                  </td>
                </tr>
                <tr>
                  <th>Last Updated</th>
                  <td>
                    {!isNftHolder
                      ? '(Never)'
                      : nftData?.updatedAt ? new Date(nftData?.updatedAt).toISOString() : ''
                    }
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <button onClick={!isNftHolder ? onClickMint : onClickUpdate} type="button">
                      {!isNftHolder
                        ? 'Mint'
                        : 'Update'
                      }</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
