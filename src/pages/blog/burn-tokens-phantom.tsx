import Footer from "components/Footer";
import Head from "next/head";

export default function PhantomBurnGuide() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-100">
      <Head>
        <title>
          How to Burn Tokens in Phantom Wallet | Complete 2025 Guide
        </title>
        <meta
          name="description"
          content="A simple beginner-friendly guide on how to burn SPL tokens and LP tokens using Phantom Wallet with SolTokenBurner. No technical knowledge required."
        />
        <link
          rel="canonical"
          href="https://www.soltokenburner.com/blog/burn-tokens-phantom"
        />
      </Head>

      <h1 className="text-3xl font-bold mb-6">
        How to Burn Tokens in Phantom Wallet
      </h1>

      <p className="mb-6">
        Phantom used to include a built-in “Burn Token” button, but it was
        removed. Today, the easiest way to burn SPL or LP tokens safely is
        through <strong>SolTokenBurner</strong>. This guide shows you how to do
        it step-by-step.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">🔥 Why Burn Tokens?</h2>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Remove unwanted or spam tokens</li>
        <li>Burn LP tokens to lock liquidity</li>
        <li>Destroy supply intentionally for tokenomics</li>
        <li>Clean your wallet from dust or scam airdrops</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        🚀 How to Burn Tokens Using Phantom (Step-by-Step)
      </h2>

      <h3 className="text-xl font-semibold mb-3">1. Open SolTokenBurner</h3>
      <p className="mb-4">
        Visit{" "}
        <a
          href="https://soltokenburner.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline"
        >
          https://soltokenburner.com/
        </a>{" "}
        and connect your Phantom wallet on the top right.
      </p>

      <h3 className="text-xl font-semibold mb-3">2. Click REFRESH</h3>
      <p className="mb-4">
        This loads all SPL tokens + LP tokens in your wallet.
      </p>

      <h3 className="text-xl font-semibold mb-3">3. Select Token to Burn</h3>
      <p className="mb-4">Choose any SPL, LP, or spam token.</p>

      <h3 className="text-xl font-semibold mb-3">4. Choose Burn Amount</h3>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          <strong>Burn All</strong> — remove full balance
        </li>
        <li>
          <strong>Input Amount to Burn</strong> — burn partially
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">5. Approve in Phantom</h3>
      <p className="mb-6">
        Once approved, the tokens are permanently destroyed.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">❗️ NOTE</h2>

      <h3 className="text-xl font-semibold mb-3">Token Burning is Permanent</h3>
      <p className="mb-6">
        Double check the token and amount before burning as it cannot be
        reversed.
      </p>

      <p className="text-gray-400 mb-10 text-sm">Updated: November 2025</p>

      <p className="mt-5 mb-10">
        🔗 Related Guides: <br />
        <a
          href="/blog/how-soltokenburner-works"
          className="text-blue-400 underline"
        >
          How SolTokenBurner Works (Technical Breakdown)
        </a>{" "}
        <br />
        <a
          href="/blog/burn-solana-spl-lp-tokens"
          className="text-blue-400 underline"
        >
          How to Burn SPL & LP Tokens on Solana
        </a>{" "}
        <br />
        <a
          href="/blog/burn-lp-tokens-solana"
          className="text-blue-400 underline"
        >
          How to Burn Liquidity Pool Tokens on Solana - LP Burn
        </a>{" "}
        <br />
        <a
          href="/blog/dead-wallet-address-solana"
          className="text-blue-400 underline"
        >
          Dead Wallet Address on Solana (Explained)
        </a>{" "}
        <br />
        <a
          href="/blog/dexscreener-padlock-liquidity-lock"
          className="text-blue-400 underline"
        >
          How to get Padlock on DexScreener (Tutorial)
        </a>{" "}
        <br />
        <a href="/blog/solana-burn-address" className="text-blue-400 underline">
          What is Solana's Burn Address
        </a>{" "}
        <br />
        <a
          href="/blog/sol-incinerator-alternative"
          className="text-blue-400 underline"
        >
          Why SolTokenBurner is the Only & Best Solana Token Burner
        </a>{" "}
        <br />
      </p>

      <Footer />
    </div>
  );
}
