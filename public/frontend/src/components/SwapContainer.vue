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
      <div class="sol-input mb-3">
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
      <button class="action-button" @click="buySolana">Buy Coin</button>
    </div>
    <div v-else class="swap-body-container">
      <div class="input-group d-flex col-md-12 justify-content-between">
        <select
          v-model="sellContractAddress"
          class="contractAddresses col-md-11"
        >
          <option value="" disabled selected>Select Contract Address</option>
          <option
            v-for="address in purchasedContractAddressesList"
            :key="address"
            :value="address"
          >
            {{ address }}
          </option>
        </select>
        <div class="col-md-1 clear-icon-container" @click="clearSellContract">
          <img src="../../public/images/clear.svg" alt="" class="clear-icon" />
        </div>
      </div>
      <div class="percentage-container col-12 mb-3 justify-content-between">
        <div v-for="amount in amounts" :key="amount" class="col-3 gx-2">
          <div
            class="fixed-amounts"
            :class="{ active: selectedAmount === amount }"
            @click="selectAmount(amount)"
          >
            {{ amount }}%
          </div>
        </div>
      </div>
      <div class="d-flex sell-amount-container mb-3">
        <span class="or-placeholder">or</span>
        <div
          class="sell-amount-dropdown"
          @click="selectAmount('custom')"
          :class="{ active: selectedAmount === 'custom' }"
        >
          <select v-model="selectedSellType" @change="handleDropdownChange">
            <option value="sol">SOL</option>
            <option value="%">%</option>
          </select>
        </div>
        <div
          class="sell-amount-input"
          @click="selectAmount('custom')"
          :class="{ active: selectedAmount === 'custom' }"
        >
          <input
            id="solAmount"
            v-model="solSellAmount"
            type="text"
            :placeholder="
              selectedSellType === 'sol'
                ? 'Amount to sell in SOL'
                : 'Percentage to sell'
            "
          />
        </div>
      </div>
      <button class="action-button" @click="buySolana">Sell Coin</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolanaSwap",
  data() {
    return {
      activeButton: "sell",
      contractAddress: "",
      rawSolAmount: 0,
      usdAmount: 0.0,
      maxSol: 100,
      maxUsd: 1000,
      solToUsdRate: 10.0,
      selectedSellType: "sol",
      selectedAmount: null,
      solSellAmount: "",
      amounts: [25, 50, 100],
      sellContractAddress: "",
      purchasedContractAddressesList: [
        "0x1234567890",
        "0x0987654321",
        "0x1357924680",
      ],
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
      this.$emit("buy-solana", {
        amount: this.rawSolAmount,
        contract: this.contractAddress,
      });
      // API integration here
    },
    selectAmount(amount) {
      this.selectedAmount = amount;
      if (amount !== "custom") {
        this.selectedSellType = "%";
        this.solSellAmount = amount.toString();
      } else {
        this.clearInput();
      }
    },
    handleDropdownChange() {
      if (this.selectedSellType === "sol") {
        this.clearInput();
      }
    },
    clearSellContract() {
      this.sellContractAddress = "";
    },
    clearInput() {
      this.solSellAmount = "";
      this.selectedAmount = null;
    },
  },
};
</script>

<style scoped>
.solana-swap {
  background-color: #1e1e2f;
  color: white;
  border-radius: 8px;
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

.action-button {
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
  padding: 10px 20px;
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
  width: 100%;
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

.fixed-amounts {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: 0 0;
  color: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  align-items: center;
  display: inline-flex;
  line-height: 1;
  font-size: 14px;
  cursor: pointer;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;
  font-weight: 500;
  min-height: 32px;
  align-items: center;
  border-radius: 100px;
}

.fixed-amounts {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.fixed-amounts.active {
  background-color: #0d98ba;
  background: rgba(106, 96, 232, 0.1);
  border-color: #6a60e8;
  color: #8e9dff;
}

.percentage-container {
  display: flex;
}

.sell-amount-dropdown {
  background: none;
  border: 1px solid #666;
  border-radius: 100px 0px 0px 100px;
  display: flex;
}

.sell-amount-dropdown select {
  background-color: transparent;
  border: none;
  color: #8d93b7;
  padding-left: 10px;
  padding-right: 5px;
  font-size: 13px;
}

.sell-amount-dropdown.active,
.sell-amount-input.active {
  color: #8e9dff;
  background: rgba(106, 96, 232, 0.1);
  border-color: #6a60e8;
}

.or-placeholder {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 15px;
  color: #8d93b7;
}

.sell-amount-dropdown select:focus,
.sell-amount-dropdown select:hover {
  outline: none;
  border: none;
}

.sell-amount-input {
  background: none;
  border: 1px solid #666;
  border-radius: 0px 100px 100px 0px;
  margin-top: auto;
  margin-bottom: auto;
}

.sell-amount-input input::placeholder {
  font-size: 14px;
}

.contractAddresses {
  background: none;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 10px;
  color: #666;
}

.contractAddresses:focus {
  outline: none;
}

.reset-select {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
}

.clear-icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.clear-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
