import type { NextPage } from "next";
import Head from "next/head";
import { TokenBurnerAllView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Burn Solana SPL & LP Tokens | SOLANATOKENBURNER</title>
        <meta
          name="description"
          content="Burn Solana SPL and LP Tokens without any coding! Solana Token Burner!"
        />
        <meta
          name="keywords"
          content="burn solana tokens, burn lp, solana token burner, burn spl tokens"
        />
      </Head>
      <TokenBurnerAllView />
    </div>
  );
};

export default Home;
