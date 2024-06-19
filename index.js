const express = require("express");
const transactionController = require("./controllers/transactionController");
const solanaService = require("./services/solanaService");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.post("/buy-coin", transactionController.buyCoin);
app.get("/transactions", transactionController.getTransactions);
app.get("/get-usd-rate", async (req, res) => {
  try {
    const rate = await solanaService.getSolToUsdRate();
    res.json({ success: true, rate });
  } catch (error) {
    console.error("Failed to fetch USD rate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch USD rate",
      error: error.toString(),
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
