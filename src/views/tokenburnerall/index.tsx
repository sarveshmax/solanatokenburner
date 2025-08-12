import { FC, useEffect, useState } from "react";
import { BurnTokens } from "components/BurnTokens";
import generateStars from "views/starGenerator";
import Footer from "components/Footer";

import {
  informationBoxStyle,
  informationBoxPrestyle,
  informationBoxStyleCentered,
} from "../informationBoxStyle";
import { BurnTokensAll } from "components/BurnTokensAll";
import { useWallet } from "@solana/wallet-adapter-react";

export const TokenBurnerAllView: FC = ({}) => {
  // BACKGROUND STARS
  useEffect(() => {
    const leftStarPositions = [
      { left: "5%", top: "70%" },
      { left: "10%", top: "20%" },
      { left: "22%", top: "35%" },
    ];
    generateStars("star-container-left", leftStarPositions, { min: 1, max: 5 });
  }, []);

  useEffect(() => {
    const rightStarPositions = [
      { right: "6%", top: "12%" },
      { right: "17%", top: "35%" },
      { right: "23%", top: "58%" },
      { right: "9%", top: "79%" },
    ];
    generateStars("star-container-right", rightStarPositions, {
      min: 1,
      max: 3,
    });
  }, []);
  const { publicKey, sendTransaction } = useWallet();

  //MAIN VIEW
  return (
    <div className="md:hero mx-auto p-4">
      {/* BACKGROUND STARS */}
      <div id="star-container-left" className="star-container-left -z-10"></div>
      <div
        id="star-container-right"
        className="star-container-right -z-10"
      ></div>
      <div className="md:hero-content flex flex-col">
        {/* SOLANA TOKEN BURNER - TITLE */}
        {/* <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-[#ffffff]">
          Solana Token Burner
        </h1> */}

        {/* DOMAIN UPGRADED */}
        <div
          style={{
            ...informationBoxStyle,
            backgroundColor: "goldenrod", // Override grey background
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "100%", // Ensure the parent container's height is sufficient
          }}
        >
          <pre
            style={{
              ...informationBoxPrestyle,
              margin: "0", // Remove any default margin
              color: "black", // Override text color
              fontWeight: "bold", // Make text bold
            }}
          >
            {`SOLTOKENBURNER is now upgraded to SOLANATOKENBURNER.COM`}
          </pre>
        </div>

        {/* BURN SOLANA SPL OR LP TOKENS - SUBTITLE */}
        <h1 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Burn Solana SPL or LP Tokens
        </h1>

        {/* SOLANA CONGESTION NOTE */}
        {/* <div style={{ ...informationBoxStyle }}>
          <pre style={{ ...informationBoxPrestyle }}>
            {`Solana is experiencing congestion.
Network fees have been raised to ensure the transaction's success.`}
          </pre>
        </div> */}

        {/* NOTE AND INSTRUCTIONS */}
        {/* <div style={{ ...informationBoxStyle }}>
          <pre style={{ ...informationBoxPrestyle }}>
            {`Click REFRESH to fetch the tokens in your wallet.

Select one of the options:
1. "Burn All" -> Burn that specific SPL/LP token completely.
2. "Input Amount to Burn" -> Burn a specific amount of the SPL/LP token.`}
          </pre>
        </div> */}
        {publicKey === null && (
          <div
            style={{
              ...informationBoxStyle,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%", // Ensure the parent container's height is sufficient
            }}
          >
            <pre
              style={{
                ...informationBoxPrestyle,
                margin: "0", // Remove any default margin
              }}
            >
              {`Please Connect Your Wallet.`}
            </pre>
          </div>
        )}

        {/* VIEW LIVE BURNS */}
        {/* <LiveTokenBurnerLink /> */}

        {/* BURN TOKENS */}
        <div className="text-center" style={{ marginTop: "5px" }}>
          <BurnTokensAll />
        </div>

        {/* OBTAIN TOKEN ACCOUNT - TUTORIAL */}
        {/* <ObtainTokenAccount /> */}

        {/* VERIFY BURN - TUTORIAL */}
        {/* <VerifyBurn /> */}

        {/* FOOTER */}
        <br />
        <Footer />
      </div>
    </div>
  );
};
