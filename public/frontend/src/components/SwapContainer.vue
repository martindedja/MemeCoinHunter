<template>
  <div class="solana-swap">
    <div class="input-group">
      <input
        id="contractAddress"
        v-model="contractAddress"
        type="text"
        placeholder="Enter Contract Address"
      />
    </div>
    <div class="sol-input">
      <span class="label-sol">
        <img src="../../public/images/solana-logo.svg" alt="" />
        SOL</span
      >
      <div>
        <input
          id="solAmount"
          v-model="solAmount"
          type="text"
          placeholder="0.00"
          @input="convertToUSD"
        />
        <div class="usd-display">≈ ${{ usdAmount.toFixed(2) }} USD</div>
      </div>
      <div class="max-info" @click="applyMax">
        <div class="max-sol">{{ maxSol }} SOL</div>
        <div class="max-usd">≈ ${{ maxUsd.toFixed(2) }} USD</div>
      </div>
    </div>
    <button @click="buySolana">Buy Coin</button>
  </div>
</template>

<script>
export default {
  name: "SolanaSwap",
  data() {
    return {
      contractAddress: "",
      rawSolAmount: 0,
      usdAmount: 0.0,
      maxSol: 100,
      maxUsd: 1000,
      solToUsdRate: 10.09,
    };
  },
  computed: {
    solAmount: {
      get() {
        return this.rawSolAmount.toFixed(2);
      },
      set(value) {
        this.rawSolAmount = parseFloat(value) || 0;
      },
    },
  },
  methods: {
    convertToUSD() {
      this.usdAmount = this.rawSolAmount * this.solToUsdRate;
    },
    applyMax() {
      this.rawSolAmount = this.maxSol;
      this.convertToUSD();
    },
    buySolana() {
      console.log(
        `Buying ${this.rawSolAmount} SOL at contract ${this.contractAddress}`
      );
      // API integration here
    },
  },
};
</script>

<style scoped>
.solana-swap {
  background-color: #1e1e2f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.sol-input {
  align-items: center;
  background-color: #333;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
}

#solAmount {
  width: 50%;
  background: transparent;
  border: none;
  color: white;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
}

.label-sol {
  color: #ffffff;
  font-size: 13px;
  margin-right: 8px;
}

#solAmount:focus {
  outline: none;
}

.input-group input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  text-align: left;
  border: 1px solid #666;
}

.max-info {
  cursor: pointer;
  color: #666;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.max-sol,
.max-usd {
  font-size: 0.8em;
}

.usd-display {
  font-size: 0.7em;
  color: #666;
  margin-top: -10px;
  padding-left: 12px;
}

.usd-amount {
  font-size: 0.9em;
  color: #4caf50;
  position: absolute;
  bottom: -25px;
  right: 0;
}

button {
  background-color: #0d98ba;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: #0a7b8c;
}
</style>
