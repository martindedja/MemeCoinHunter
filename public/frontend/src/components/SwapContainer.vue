<template>
  <div class="solana-swap">
    <div class="action-buttons">
      <div class="button-container" :class="{ active: activeButton === 'buy' }">
        <button @click="selectAction('buy')">Buy</button>
      </div>
      <div
        class="button-container"
        :class="{ active: activeButton === 'sell' }"
      >
        <button @click="selectAction('sell')">Sell</button>
      </div>
    </div>
    <div v-if="activeButton === 'buy'" class="swap-body-container">
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
        <div class="amount-container">
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
          <div class="max-sol">Max. {{ maxSol }} SOL</div>
          <div class="max-usd">≈ ${{ maxUsd.toFixed(2) }} USD</div>
        </div>
      </div>
      <button @click="buySolana">Buy Coin</button>
    </div>
    <div v-else class="swap-body-container">
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
        <div class="amount-container">
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
          <div class="max-sol">Max. {{ maxSol }} SOL</div>
          <div class="max-usd">≈ ${{ maxUsd.toFixed(2) }} USD</div>
        </div>
      </div>
      <button @click="buySolana">Buy Coin</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolanaSwap",
  data() {
    return {
      activeButton: "buy",
      contractAddress: "",
      rawSolAmount: 0,
      usdAmount: 0.0,
      maxSol: 100,
      maxUsd: 1000,
      solToUsdRate: 10.0,
    };
  },
  computed: {
    solAmount: {
      get() {
        return Number(this.rawSolAmount).toFixed(2);
      },
      set(value) {
        const parsed = parseFloat(value);
        this.rawSolAmount = isNaN(parsed) ? 0 : parsed;
      },
    },
  },
  methods: {
    selectAction(action) {
      this.activeButton = action;
    },
    convertToUSD() {
      if (isNaN(this.rawSolAmount)) {
        this.usdAmount = 0;
      } else {
        this.usdAmount = this.rawSolAmount * this.solToUsdRate;
      }
    },
    applyMax() {
      this.rawSolAmount = this.maxSol;
      this.convertToUSD();
    },
    buySolana() {
      console.log(
        `Buying ${this.rawSolAmount} SOL at contract ${this.contractAddress}`
      );
      this.$emit("buy-solana", {
        amount: this.rawSolAmount,
        contract: this.contractAddress,
      });
      // API integration here
    },
  },
};
</script>

<style scoped>
.solana-swap {
  background-color: #1e1e2f;
  color: white;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.swap-body-container {
  padding: 20px;
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
.amount-container {
  width: 50%;
}
#solAmount {
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
.action-buttons {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.action-buttons button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8d93b7;
  font-size: 14px;
  font-weight: 600;
  margin: -1px;
  border-radius: 8px 8px 0 0;
  border: 1px solid transparent;
  background: none;
}

.button-container {
  flex: 1;
}

.action-buttons .active {
  color: rgba(255, 255, 255, 0.95);
  height: 41px;
  padding-bottom: 1px;
  margin-bottom: -1px;
  z-index: 2;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, #31333f 0%, #191a22 100%);
  border-color: rgba(255, 255, 255, 0.03);
}
</style>
