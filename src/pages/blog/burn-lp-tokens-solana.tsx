import Footer from "components/Footer";
import Head from "next/head";

export default function BurnLPTokensGuide() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-100">
      <Head>
        <title>How to Burn LP Tokens on Solana | Complete 2025 Guide</title>
        <meta
          name="description"
          content="A detailed guide explaining how to burn LP tokens on Solana using Phantom and SolTokenBurner. Works for Raydium, Orca, Meteora, and all SPL LP tokens."
        />
        <link
          rel="canonical"
          href="https://www.soltokenburner.com/blog/burn-lp-tokens-solana"
        />
      </Head>

      <h1 className="text-3xl font-bold mb-6">
        How to Burn LP Tokens on Solana (2025 Complete Guide)
      </h1>

      <p className="mb-6">
        LP tokens on Solana represent your share in a liquidity pool. Sometimes
        projects or owners need to burn LP tokens permanently — either to lock
        liquidity, prevent rug risks, or reduce supply. This guide explains how
        to burn any LP tokens including Raydium, Orca, Meteora, Crema and all
        SPL-based LP tokens.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        🔥 Why Burn LP Tokens?
      </h2>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Lock liquidity to build trust</li>
        <li>Remove leftover LP after a migration</li>
        <li>Eliminate old pool tokens</li>
        <li>Prevent LP tokens from being traded or circulated</li>
        <li>Get PadLock on DexScreener</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        🚀 How to Burn LP Tokens (Step-by-Step)
      </h2>

      <p className="mb-4">
        LP tokens are just SPL tokens, so they can be burned the same way
        regular SPL tokens are burned — using SolTokenBurner.
      </p>

      <h3 className="text-xl font-semibold mb-3">1. Open SolTokenBurner</h3>
      <p className="mb-4">
        Go to https://soltokenburner.com/ and connect your Phantom wallet.
      </p>

      <h3 className="text-xl font-semibold mb-3">2. Click REFRESH</h3>
      <p className="mb-4">The app will load your SPL/LP tokens and balances.</p>

      <h3 className="text-xl font-semibold mb-3">3. Select the LP Token</h3>
      <p className="mb-4">
        LP tokens usually appear with random characters like 'jhThdYst' or names
        like RAY-LP, ORCA-LP, POOL-LP, etc.
      </p>

      <h3 className="text-xl font-semibold mb-3">4. Choose an Option</h3>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          <strong>Burn All</strong> — removes the entire LP amount
        </li>
        <li>
          <strong>Input Amount to Burn</strong> — burns only a specific amount -
          later you can burn the remaining or pull the liquidity
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">5. Approve in Wallet</h3>
      <p className="mb-6">
        Once approved, the LP tokens are permanently removed from your wallet
        and supply. The PadLock will appear on DexScreener now.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        🔍 How to Verify on Solscan
      </h2>

      <p className="mb-6">
        Open Solscan → paste your wallet address → check the latest transaction
        labeled
        <strong> Burn </strong>. You can share this link as proof of locked
        liquidity.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">📌 Final Word</h2>

      <p className="mb-5">
        Burning LP tokens is one of the strongest trust signals for communities.
        SolTokenBurner gives you full control, lets you burn any amount, and
        works for all Solana LP tokens.
      </p>

      <p className="text-gray-400 mb-10 text-sm">Updated: November 2025</p>

      <p className="mt-5 mb-10">
        🔗 Related Guides: <br />
        <a
          href="/blog/burn-solana-spl-lp-tokens"
          className="text-blue-400 underline"
        >
          How to Burn SPL & LP Tokens on Solana
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
