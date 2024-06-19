const solanaWeb3 = require("@solana/web3.js");
const config = require("config");
const sdk = require("@api/coinstatsopenapi");

sdk.auth(config.get("sdk.apiKey"));

const getSolToUsdRate = async () => {
  try {
    const response = await sdk.getCoinById({ coinId: "solana" });
    console.log("SOL to USD rate:", response.data.price);
    return response.data.price;
  } catch (err) {
    console.error("Error fetching SOL to USD rate:", err);
    return 0;
  }
};

const buyCoin = async (contractAddress, amountSol) => {
  const connection = new solanaWeb3.Connection(config.get("solana.rpcUrl"));
  // Implement the transaction logic using solanaWeb3 here
  const transactionResult = {};
  return transactionResult;
};

module.exports = {
  getSolToUsdRate,
  buyCoin,
};
