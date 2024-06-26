// Imports
// ========================================================
import Connect from "../components/Connect";
import { LogoBerachain, LogoGitHub, LogoIrys } from "../components/Icons";
import NFT from "../components/NFT";

// Main Page Component
// ========================================================
export default function Page(): JSX.Element {
  return (
    <>
      <nav>
        <div>
          <div>
            <span id="logo"><LogoBerachain /><span>&#215;</span><LogoIrys className="mt-1" /></span>
          </div>
          <div>
            <ul>
              <li>
                <a target="_blank" href="https://github.com/codingwithmanny/berachain-irys"><LogoGitHub /></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <div>
          <h1>NFT Mint</h1>
          <h2>Your Dynamic Irys NFT</h2>
          <p>This demonstrates using Irys Mutable References to create dynamic NFTs on Berachain. <br/>Each NFT changes over time based on how much <code>$bHoney</code> a user has accumulated.</p>
          <p>Start by connecting your wallet to mint or check your current NFT state.</p>

          <p className="bg-gray-300/50 p-4"><small>How do I get <code>$bHoney</code>?<br/>Deposit <code>$Honey</code> into the <a href="https://artio.berps.berachain.com/vault" target="_blank">Berps Vault</a> in exchange for <code>$bHoney</code>.</small></p>
          <Connect />
          <NFT />
        </div>
      </main>
      <footer>
        <div>
          <p>Berachain & Irys</p>
        </div>
      </footer>
    </>
  );
}
