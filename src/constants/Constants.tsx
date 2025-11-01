import { PublicKey } from "@solana/web3.js";
import * as keys from "./Keys";
export const getFeeBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const unknownTokenImageURL =
  "https://upload.wikimedia.org/wikipedia/commons/5/55/Question_Mark.svg";

export const priorityFeeRate = 50000000; // MICRO_LAMPORTS

//RPC URL
export const theRpcURL =
  // "https://solana-mainnet.g.alchemy.com/v2/De7sup4b6lJNpG-27MZcDvoYGmS3Tbcg";
  "https://mainnet.helius-rpc.com/?api-key=c4b39a0f-0237-4381-a8d1-5ebfac9d6818";
  // "https://cool-green-pine.solana-mainnet.quiknode.pro/7dcb1ea72bac02eb82d4f51dff0ee614e47f5568"; //kgm at gmail - not paid 15req/sec
// "https://rpc.ankr.com/solana/955402944d335f886e9a1518ffd10608dcc14cac77de5870da2012b6f5168ff9"; //paid 20usd 1k req/sec but slow
// "https://go.getblock.io/d39dd752cb6e40f8a80170adac174880"; //paid 29 usd, getblock 1 month only from feb 19

//FEES
export const addressToReceiveBurnFees = new PublicKey(
  "2HvP1hoLZHu8NSsht4QQ87ULyBqUgdBWYxHcpZnqmogR", //acc 16 - STB Fees New
);

// export const feeForBurningLiquidity = getFeeBetween(2040000, 2050000); // 0.00204 - 0.00205 SOL
export const feeForBurningLiquidity = 2040000; //0.00205 SOL

export const tokensToIgnore = [
  "B6FSrHBfZyyK7MTjBQ51WCcoA1aDMTrSCJkRfm3nNTmS",
  "bicltvkmq6m7r9pjdpx5ne6daq7y5ucun58aq7pzo2je",
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", //circle
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", //tether
  "FtUEW73K6vEYHfbkfpdBZfWpxgQar2HipGdbutEhpump", //LP151
  "DP1q7SqYkUdco2MVKYEvwA5DbGEKN4PjoNcrHg4krDVL", //LP151
  "9ZQunFJbBfJ6voEemUAAhYPft23N6PL9cQ72xeATPkCd", //LP151
  "83CHtp5zfe8yEtrCypLF88bkFY1huxzFyLDswcrCpump", //LP151
  "3vEnveXeLT5uqMoMjEJTcCiShgoYQdrp2q9oo35D6kYc", //LP151
];

//----------------------------------------------------------------------------//
//---------------------------BURN-RELATED CONSTANTS---------------------------//
//----------------------------------------------------------------------------//

export const runFakeBurn = true;
export const minimunTokenValueInUSD = 3000;
export const addressToRecieveLPTokens = new PublicKey(
  keys.walletAddresses[154],
);

// export const secret = keys.secret120;
// export const addressToRecieveFakeBurnFeesForFunding = keys.fees120;
