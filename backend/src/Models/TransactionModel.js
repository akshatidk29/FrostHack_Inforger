import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link transactions to users
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // Food, Shopping, etc.
  date: { type: Date, required: true, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;