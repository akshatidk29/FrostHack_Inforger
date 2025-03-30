import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { toast } from "react-hot-toast";

export const UseAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,

    // ✅ Check if user is authenticated
    CheckAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/Auth/Check");
            set({ authUser: res.data || null });
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // ✅ Signup function
    Signup: async (fullName, email, password) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/Auth/Signup", { fullName, email, password });
            set({ authUser: res.data });
            toast.success("Signup successful! Welcome aboard.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Try again!");
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    // ✅ Login function
    Login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/Auth/Login", { email, password });
            set({ authUser: res.data });
            toast.success("Login successful! Welcome back.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials. Try again!");
            set({ authUser: null });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // ✅ Logout function
    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post("/Auth/Logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error("Logout failed. Try again!");
        } finally {
            set({ isLoggingOut: false });
        }
    },

}));
