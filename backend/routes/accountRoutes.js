const express = require("express");

const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const router = express.Router();


// ======================================
// CREATE ACCOUNT
// POST /api/account
// ======================================

router.post("/", async (req, res) => {
    try {
        const { accountHolder } = req.body;

        if (!accountHolder || !accountHolder.trim()) {
            return res.status(400).json({
                message: "Account holder name is required"
            });
        }

        const account = await Account.create({
            accountHolder: accountHolder.trim(),
            balance: 0
        });

        res.status(201).json({
            message: "Account created successfully",
            account
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create account"
        });
    }
});


// ======================================
// GET ALL ACCOUNTS
// GET /api/account
// ======================================

router.get("/", async (req, res) => {
    try {
        const accounts = await Account.find().sort({ createdAt: -1 });

        res.json({
            accounts
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch accounts"
        });
    }
});


// ======================================
// GET SINGLE ACCOUNT
// GET /api/account/:id
// ======================================

router.get("/:id", async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            account
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch account"
        });
    }
});


// ======================================
// DEPOSIT
// POST /api/account/:id/deposit
// ======================================

router.post("/:id/deposit", async (req, res) => {
    try {
        const amount = Number(req.body.amount);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        account.balance += amount;

        await account.save();

        const transaction = await Transaction.create({
            accountId: account._id,
            type: "deposit",
            amount: amount
        });

        res.json({
            message: "Deposit successful",
            account,
            transaction
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Deposit failed"
        });
    }
});


// ======================================
// WITHDRAW
// POST /api/account/:id/withdraw
// ======================================

router.post("/:id/withdraw", async (req, res) => {
    try {
        const amount = Number(req.body.amount);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero"
            });
        }

        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        if (amount > account.balance) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        account.balance -= amount;

        await account.save();

        const transaction = await Transaction.create({
            accountId: account._id,
            type: "withdraw",
            amount: amount
        });

        res.json({
            message: "Withdrawal successful",
            account,
            transaction
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Withdrawal failed"
        });
    }
});


// ======================================
// GET TRANSACTION HISTORY
// GET /api/account/:id/transactions
// ======================================

router.get("/:id/transactions", async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        const transactions = await Transaction
            .find({ accountId: req.params.id })
            .sort({ createdAt: -1 });

        res.json({
            transactions
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch transactions"
        });
    }
});


module.exports = router;