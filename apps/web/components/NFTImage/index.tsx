"use client";

// Imports
// ========================================================
import { useState } from "react";
import { useReadContract } from "wagmi";
import Loader from "../Loader";
import abi from "../../utils/abi";
import { useQuery } from "@tanstack/react-query";

// Components
// ========================================================
export default function NFTImage({ isLoading = true, tokenId = -1 }) {
  // State / Props
  const [imgUrl, setImgUrl] = useState(`${process.env.NEXT_PUBLIC_DEFAULT_IMAGE}`);

  // Requests
  /**
   * @dev retrives the tokenId of address
   */
  const bHoneyNFTTokenURI = useReadContract({
    abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` as `0x${string}`,
    functionName: 'tokenURI',
    args: [tokenId],
    query: {
      enabled: tokenId > -1 && !isLoading
    }
  });

  /**
   * @dev retrieves image from json
   */
  const readTokenURI = useQuery({
    queryKey: ['readTokenURI'],
    queryFn: async () => {
      const response = await fetch(`${bHoneyNFTTokenURI?.data}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (!response.ok || !json?.image) {
        throw Error('Could not retrieve nft image.');
      }
      console.log({ json });
      setImgUrl(json?.image);
      return json;
    },
    enabled: !bHoneyNFTTokenURI.isLoading && bHoneyNFTTokenURI?.data ? true : false,
  });

  /**
   * @dev handles all loading
   */
  const isAnyLoading = isLoading || bHoneyNFTTokenURI.isLoading || readTokenURI.isLoading;

  // Render
  return <>
    <div className="relative">
      {imgUrl !== `${process.env.NEXT_PUBLIC_DEFAULT_IMAGE}`
        ? <span className="mb-4 block w-full bg-red-200 p-4 rounded text-sm text-red-800"><b>NOTE:</b> Image caching might be in effect.<br />Please try updating a few times.</span>
      : null}
      <img className={`${isAnyLoading ? 'opacity-15' : ''}`} src={imgUrl} />
    </div>
    {isAnyLoading ? <Loader /> : null}
  </>
}