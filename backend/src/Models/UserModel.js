import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        budgets: [
            {
                category: { type: String, required: true },
                limit: { type: Number, required: true },
                spent: { type: Number, required: true, default: 0 },
            }
        ],
        goals: [
            {
                title: String,
                target: Number,
                current: { type: Number, default: 0 },
                deadline: Date,
                complete: { type: Boolean, default: false },
            }
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
