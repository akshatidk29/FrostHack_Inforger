import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { toast } from "react-hot-toast";

export const useInfoStore = create((set) => ({
    // ✅ State for budgets
    budgetss: [],
    isAddingBudget: false,

    // ✅ State for goals
    goals: [],
    isAddingGoal: false,

    // ✅ Fetch user budgets
    fetchBudgets: async () => {
        try {
            const res = await axiosInstance.get("/Info/Budgets");
            set({ budgetss: res.data || [] });
        } catch (error) {
            toast.error("Failed to load budgets.");
        }
    },

    // ✅ Add new budget
    addBudget: async (newBudget) => {
        set({ isAddingBudget: true });
        try {
            await axiosInstance.post("/Info/Budget", { budgets: [newBudget] });
            set((state) => ({ budgetss: [...state.budgetss, newBudget] }));
            toast.success("Budget added successfully!");
        } catch (error) {
            toast.error("Failed to add budget.");
        } finally {
            set({ isAddingBudget: false });
        }
    },

    // ✅ Fetch user goals
    fetchGoals: async () => {
        try {
            const res = await axiosInstance.get("/Info/Goals");
            set({ goals: res.data || [] });
        } catch (error) {
            toast.error("Failed to load goals.");
        }
    },

    // ✅ Add new goal
    addGoal: async (newGoal) => {
        set({ isAddingGoal: true });
        try {
            await axiosInstance.post("/Info/Goals", { goals: [newGoal] });
            set((state) => ({ goals: [...state.goals, newGoal] }));
            toast.success("Goal added successfully!");
        } catch (error) {
            toast.error("Failed to add goal.");
        } finally {
            set({ isAddingGoal: false });
        }
    },
}));
