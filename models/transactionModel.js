const mysql = require("mysql2/promise");
const config = require("config");

const pool = mysql.createPool({
  host: config.get("database.host"),
  user: config.get("database.user"),
  password: config.get("database.password"),
  database: config.get("database.database"),
});

async function createTransaction(transactionData) {
  console.log("transactionData", transactionData);
  const { contractAddress, entry_price, amountSol, amountUsd } = transactionData;
  const query = `INSERT INTO transactions (contract_address, entry_price, amount_sol, amount_usd) VALUES (?, ?, ?)`;
  const [result] = await pool.execute(query, [
    contractAddress,
    entry_price,
    amountSol,
    amountUsd,
  ]);
  return result;
}

async function getTransactionsByUser() {
  const query = `SELECT * FROM transactions`;
  const [rows] = await pool.execute(query);
  return rows;
}

module.exports = {
  createTransaction,
  getTransactionsByUser,
};
