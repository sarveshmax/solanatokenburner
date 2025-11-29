import Footer from "components/Footer";
import Head from "next/head";
import Link from "next/link";

export default function BlogIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
      <Head>
        <title>Solana Token Burning Blog | SolTokenBurner</title>
        <meta
          name="description"
          content="🔥 Learn how to burn SPL tokens, LP tokens, lock liquidity, get the Dexscreener padlock, and more. Official Solana burning guides by SolTokenBurner."
        />
        <link rel="canonical" href="https://old.soltokenburner.com/blog" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">🔥 Solana Token Burner Blog</h1>

      <p className="mb-8 text-gray-300">
        📘 Guides, tutorials, and documentation for burning SPL tokens, LP
        tokens, locking liquidity, and understanding Solana’s token burn
        mechanics.
      </p>

      <div className="space-y-6">
        <BlogLink
          title="⚙️ How SolTokenBurner Works (Technical Breakdown)"
          url="/blog/how-soltokenburner-works"
        />

        <BlogLink
          title="🧨 How to Burn SPL or LP Tokens on Solana"
          url="/blog/burn-solana-spl-lp-tokens"
        />

        <BlogLink
          title="🔥 How to Burn Liquidity Pool Tokens on Solana"
          url="/blog/burn-lp-tokens-solana"
        />

        <BlogLink
          title="💀 Solana Dead Wallet Address (Why It Doesn't Exist)"
          url="/blog/dead-wallet-address-solana"
        />

        <BlogLink
          title="👻 Burn Tokens Using Phantom Wallet"
          url="/blog/burn-tokens-phantom"
        />

        <BlogLink
          title="🔒 Get Dexscreener Padlock by Burning LP"
          url="/blog/dexscreener-padlock-liquidity-lock"
        />

        <BlogLink
          title="🔥 Solana Burn Address - What is it?"
          url="/blog/solana-burn-address"
        />

        <BlogLink
          title="⚡ Why SolTokenBurner is the Best!"
          url="/blog/sol-incinerator-alternative"
        />
      </div>

      <div className="h-20" />

      <Footer />
    </div>
  );
}

function BlogLink({ title, url }: { title: string; url: string }) {
  return (
    <Link href={url}>
      <div className="p-4 rounded-xl bg-black border border-neutral-700 hover:border-neutral-500 hover:bg-black transition cursor-pointer">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-blue-400 mt-1">{url}</p>
      </div>
    </Link>
  );
}
