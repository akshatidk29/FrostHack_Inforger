import express from "express";
import { CheckAuth, Login, Logout, Signup, UpdateProfilePic } from "../Controllers/AuthController.js";
import { ProtectRoute } from "../Middleware/AuthMiddleWare.js";

const router = express.Router();

router.post("/Signup", Signup);
router.post("/Login", Login);
router.post("/Logout", Logout);
router.get("/Check", ProtectRoute, CheckAuth );
router.get("/UpdateProfile", ProtectRoute, UpdateProfilePic );

export default router;