import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { toast } from "react-hot-toast";

export const UseTransactionStore = create((set, get) => ({
    transactions: [],
    isLoading: false,
    isAdding: false,
    isDeleting: false,

    // ✅ Fetch all transactions
    FetchTransactions: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/Transaction");
            set({ transactions: res.data });
        } catch (error) {
            toast.error("Failed to fetch transactions.");
            set({ transactions: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    // ✅ Add a new transaction
    AddTransaction: async (transactionData) => {
        set({ isAdding: true });
        try {
            const res = await axiosInstance.post("/Transaction/Add", transactionData);
            set({ transactions: [...get().transactions, res.data] });
            toast.success("Transaction added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add transaction.");
        } finally {
            set({ isAdding: false });
        }
    },

    // ✅ Delete a transaction
    DeleteTransaction: async (transactionId) => {
        set({ isDeleting: true });
        try {
            await axiosInstance.delete(`/Transactions/Delete/${transactionId}`);
            set({
                transactions: get().transactions.filter((txn) => txn._id !== transactionId),
            });
            toast.success("Transaction deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete transaction.");
        } finally {
            set({ isDeleting: false });
        }
    },
}));
