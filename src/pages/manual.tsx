import type { NextPage } from "next";
import Head from "next/head";
import { TokenBurnerView } from "../views";

const TokenBurner: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Burn Solana SPL & LP Tokens | OLD SolTokenBurner</title>
        <meta
          name="description"
          content="Burn Solana SPL and LP Tokens without any coding! Solana Token Burner!"
        />
        <meta
          name="keywords"
          content="burn solana tokens, burn lp, solana token burner, burn spl tokens"
        />
        <link rel="canonical" href="https://old.soltokenburner.com/manual" />
      </Head>
      <TokenBurnerView />
    </div>
  );
};

export default TokenBurner;
