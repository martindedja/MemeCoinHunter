<template>
  <div id="app">
    <ThreeScene />
    <header class="app-header">
      <div class="menu-container">
        <img class="icon" src="../public/images/empty-wallet.svg" alt="" />
        <div>
          <div class="header-title">
            <div>
              <img
                class="solana-icon"
                src="../public/images/solana-logo.svg"
                alt=""
              />
            </div>
            <span class="js-generated-balance">0</span>
          </div>
          <div class="header-subtitle">SOL</div>
        </div>
        <!-- <div class="menu-item">User Address: {{ userAddress }}</div>
        <button class="menu-button" @click="connectMetamask">
          Connect to Metamask
        </button> -->
      </div>
    </header>
    <div id="content">
      <h1>Welcome to Solana Snipe Bot</h1>
      <div class="input-container">
        <div class="main-container">
          <div class="content">
            <SwapContainer />
          </div>
        </div>
      </div>
    </div>
    <div id="investmentTable">
      <TransactionsTable />
    </div>
  </div>
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";
import TransactionsTable from "./components/TransactionsTable.vue";
import SwapContainer from "./components/SwapContainer.vue";
export default {
  name: "App",
  data() {
    console.log(process.env.VUE_APP_API_URL);
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      contractAddress: "",
      amountSol: null,
      amountUSD: "",
      investments: [],
    };
  },
  components: {
    ThreeScene,
    TransactionsTable,
    SwapContainer,
  },
  methods: {
    async convertToUSD() {
      try {
        const response = await fetch(`${this.apiUrl}/get-usd-rate`);
        const data = await response.json();
        this.amountUSD = (this.amountSol * data.rate).toFixed(2);
      } catch (err) {
        console.error("Error fetching rate:", err);
      }
    },
    async buyCoin() {
      try {
        const response = await fetch(`${this.apiUrl}/buy-coin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contractAddress: this.contractAddress,
            amountSol: this.amountSol,
          }),
        });
        const data = await response.json();
        console.log("Buy operation:", data);
        this.updateInvestmentTable();
      } catch (error) {
        console.error("Error buying coin:", error);
      }
    },
    async updateInvestmentTable() {
      try {
        const response = await fetch(`${this.apiUrl}/transactions`);
        const data = await response.json();
        this.investments = data;
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    },
  },
};
</script>

<style>
#app {
  top: 0;
}

.app-header {
  color: #fff;
  padding: 10px;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: flex-end;
}

.menu-container {
  display: flex;
  align-items: center;
  margin-right: 10rem;
}

.menu-item {
  margin-right: 20px;
  font-weight: bold;
}

.menu-button {
  padding: 8px 16px;
  background-color: #666;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-button:hover {
  background-color: #555;
}

.icon {
  width: 25px;
  height: 25px;
  filter: invert(1);
  margin-right: 6px;
}

.solana-icon {
  width: 12px;
  height: 12px;
  min-width: 12px;
  margin-right: 4px;
}

.header-title {
  display: flex;
}

.js-generated-balance {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #f2f5f9;
}

.header-subtitle {
  font-size: 12px;
  color: #8d93b7;
}

#content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
}
#investmentTable {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.tableData {
  border: solid 1px #ddeeee;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
}
.tableData thead td {
  background-color: #ddefef;
  border: solid 1px #ddeeee;
  color: #336b6b;
  padding: 10px;
  text-align: left;
  text-shadow: 1px 1px 1px #fff;
}
.tableData tbody td {
  border: solid 1px #ddeeee;
  color: #7e99db;
  padding: 10px;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #121212;
  color: white;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #0d98ba;
  text-align: center;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 12px;
  display: inline-block;
  border: 1px solid #333;
  box-sizing: border-box;
  background-color: #333;
  color: #0d98ba;
  border-radius: 5px;
}

input[type="text"]:read-only {
  background-color: #666;
}

button {
  background-color: #0d98ba;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0a7b8c;
}

#investmentTable {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

#investment45dTable th,
#investmentTable td {
  border: 1px solid #0d98ba;
  padding: 8px;
  text-align: left;
}

@media screen and (max-width: 600px) {
  input[type="text"],
  input[type="number"],
  button {
    width: 100%;
  }
}

html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translate(0%, -50%);
  z-index: -1;
  overflow: hidden;
}

#content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
}

.input-container {
  width: 100%;
}

.input-container .content {
  width: 70%;
}

.main-container {
  display: flex;
  justify-content: center;
}

.input-container .content > input,
.input-container .content > button {
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #333;
  background-color: #333;
  color: #0d98ba;
  border-radius: 5px;
  text-align: center;
}

.input-container > input[type="text"]:read-only {
  background-color: #666;
}

.input-container > button {
  cursor: pointer;
  background-color: #0d98ba;
  color: white;
  transition: background-color 0.3s ease;
}

.input-container > button:hover {
  background-color: #0a7b8c;
}

@media screen and (max-width: 600px) {
  .input-container > input,
  .input-container > button {
    margin-left: 5%;
    margin-bottom: 7px;
  }
}
</style>
