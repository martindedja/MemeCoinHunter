<template>
  <div id="investmentTable">
    <table class="tableData">
      <thead>
        <tr>
          <th>ID</th>
          <th>Contract Address</th>
          <th>Amount SOL</th>
          <th>Amount USD</th>
          <th>Transaction Status</th>
          <th>Created At</th>
          <th>Profit/Loss ($ and %)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="investment in investments" :key="investment.id">
          <td>{{ investment.id }}</td>
          <td>{{ investment.contract_address }}</td>
          <td>{{ investment.amount_sol }}</td>
          <td>{{ investment.amount_usd }}</td>
          <td>{{ investment.transaction_status }}</td>
          <td>{{ investment.created_at }}</td>
          <td>{{ investment.profit_loss }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TransactionsTable",
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      investments: [],
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
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
.tableData {
  width: 100%;
  border-collapse: collapse;
}
.tableData th,
.tableData td {
  border: 1px solid #ddeeee;
  padding: 10px;
  text-align: left;
}
</style>
