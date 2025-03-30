import express from "express";
import { ProtectRoute } from "../Middleware/AuthMiddleWare.js";
import Transaction from "../Models/TransactionModel.js"
import axios from "axios"
import fs from "fs"
import path from "path";
import { spawn } from "child_process";

const router = express.Router();

router.post("/Add", ProtectRoute, async (req, res) => {
    try {
        const { amount, category, date } = req.body;
        const { id: userId, fullName, email } = req.user;

        // 🔥 Save transaction in MongoDB first
        const newTransaction = new Transaction({
            userId,
            amount,
            category,
            date,
        });
        await newTransaction.save();

        // ✅ Define the user's transaction file path
        const userFilePath = path.resolve(`./src/AI/Data/${userId}.txt`);

        // ✅ Create transaction text entry
        const transactionText = `\n${date} | ${category} | Amount: ${amount}\n`;

        // ✅ Check if file exists
        if (!fs.existsSync(userFilePath)) {
            // 🆕 If file doesn't exist, create it and add heading
            const heading = `User ID: ${userId}\nName: ${fullName}\nEmail: ${email}\n\nTransactions:\n`;
            fs.writeFileSync(userFilePath, heading + transactionText, 'utf8');
        } else {
            // ✏️ If file exists, append transaction
            fs.appendFileSync(userFilePath, transactionText, 'utf8');
        }

        res.status(201).json({
            message: "Transaction added successfully",
            newTransaction,
        });

    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/", ProtectRoute, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Get transactions for a specific user by userId
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request URL
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found for this user." });
        }

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// Get total spending for a time range
router.post("/Total-Spent", ProtectRoute, async (req, res) => {
    try {
        const { startDate, endDate, category } = req.body;

        console.log("Received Body Params:", { startDate, endDate, category }); // Debugging

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ error: "Invalid startDate or endDate format. Use YYYY-MM-DD." });
        }

        let filter = {
            userId: req.user.id,
            date: { $gte: start, $lte: end }
        };

        if (category) filter.category = category;

        const transactions = await Transaction.find(filter);
        const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

        res.json({ totalSpent, transactionCount: transactions.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Updated Express route handler
const AI_API_URL = "http://localhost:9002/api/ai-query"; // FastAPI endpoint

router.post("/Query", ProtectRoute, async (req, res) => {
    try {
        const userQuery = req.body.query;
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
        // Send request to Fetch AI's FastAPI instead of spawning Python
        const aiResponse = await axios.post(AI_API_URL, {
            query: userQuery,
            user_id: req.user.id,
            transactions: transactions
        });

        res.json({ response: aiResponse.data.response });

    } catch (error) {
        res.status(500).json({ error: error.message || "Server error" });
    }
});


export default router;