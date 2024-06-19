const solanaService = require('../services/solanaService');
const transactionModel = require('../models/transactionModel');
const e = require('express');

async function buyCoin(req, res) {
    try {
        const { contractAddress, amountSol } = req.body;
        const usdRate = await solanaService.getSolToUsdRate();
        const amountUsd = amountSol * usdRate;
        const transactionResult = await solanaService.buyCoin(contractAddress, amountSol);
        await transactionModel.createTransaction({
            contractAddress,
            entry_price,
            amountSol,
            amountUsd
        });

        res.json({ success: true, amountUsd, transactionResult });
    } catch (error) {
        console.error('Error in buying coin:', error);
        res.status(500).json({ message: 'Error buying coin' });
    }
}

async function getTransactions(req, res) {
    try {
        const { userId } = req.query;
        const transactions = await transactionModel.getTransactionsByUser();
        res.json(transactions);
    } catch (error) {
        console.error('Error in fetching transactions:', error);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
}

module.exports = {
    buyCoin,
    getTransactions
};
