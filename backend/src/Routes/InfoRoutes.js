import express from "express";
import { ProtectRoute } from "../Middleware/AuthMiddleWare.js";
import User from "../Models/UserModel.js"

const router = express.Router();

router.post("/Budget", ProtectRoute, async (req, res) => {
    try {
        const { budgets } = req.body; // Expecting an array of new budget entries
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Append new budgets instead of replacing the entire array
        user.budgets.push(...budgets);
        await user.save();

        res.status(200).json({ message: "Budgets added successfully", budgets: user.budgets });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/Budgets", ProtectRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.budgets || []);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/Goals", ProtectRoute, async (req, res) => {
    try {
        const { goals } = req.body;
        const userId = req.user.id;

        // ✅ Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        goals.forEach((newGoal) => {
            // 🔥 Remove existing goal with the same title (if exists)
            user.goals = user.goals.filter(goal => goal.title !== newGoal.title);

            // ✅ Push the new goal
            user.goals.push({
                title: newGoal.title,
                target: newGoal.target,
                current: newGoal.current || 0,
                deadline: newGoal.deadline,
                complete: newGoal.complete || false,
            });
        });

        await user.save(); // ✅ Save updated user

        res.status(200).json({ message: "Goals updated successfully", goals: user.goals });
    } catch (error) {
        console.error("Error updating goals:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.get("/Goals", ProtectRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.goals);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


export default router;