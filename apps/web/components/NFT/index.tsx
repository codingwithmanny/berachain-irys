"use client";

// Imports
// ========================================================
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Loader from "../Loader";

// Components
// ========================================================
export default function NFT() {
  const [status, setStatus] = useState("Verifying...");
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  // Hooks
  useEffect(() => {
    if (!isLoading) return;
    console.log({ isConnected });
    if (isConnected) {
      setStatus("Connected");
      setIsLoading(false);
    }
  }, [isConnected]);

  // Render
  if (!isConnected) return null;

  return (
    <>
      <section>
        {isLoading ? (
          <Loader status={status} />
        ) : (
          <div>
            <div>
              <img className="opacity-15" src={`https://picsum.photos/480`} />
              <Loader />
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>Berachain #8</td>
                </tr>
                <tr>
                  <th>Symbol</th>
                  <td>BHNFT</td>
                </tr>
                <tr>
                  <th>$bHoney Amount</th>
                  <td>(Mint to find out)</td>
                </tr>
                <tr>
                  <th>Level</th>
                  <td>
                    <code>2</code>
                  </td>
                </tr>
                <tr>
                  <th>Last Updated</th>
                  <td>2023-05-21:21:12:12</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <button type="button">Update</button>
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
