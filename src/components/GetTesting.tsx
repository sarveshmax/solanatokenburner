import { FC, useState, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  Account,
  getAccount,
  getMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export const GetTesting: FC = () => {
  const { connection } = useConnection();

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");

  const getTokenDetails = useCallback(
    async (form) => {
      const tokenAccount = new PublicKey(form.tokenAddress);

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
      setTokenDecimals(decimals.toString());
    },
    [tokenAddress, connection],
  );

  return (
    <>
      <div className="my-6">
        <input
          type="text"
          value={tokenAddress}
          className="form-control block mb-2 ml-auto mr-auto max-w-800 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Token Address"
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button
          className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
          onClick={() => getTokenDetails({ tokenAddress })}
        >
          <span>Get Metadata</span>
        </button>

        <input
          type="text"
          value={tokenDecimals}
          className="form-control block mb-2 ml-auto mr-auto max-w-800 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Token Decimals"
          onChange={(e) => setTokenDecimals(e.target.value)}
        />
      </div>
    </>
  );
};
