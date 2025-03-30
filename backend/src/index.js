import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import AuthRoutes from "./Routes/AuthRoutes.js"
import TransactionRoutes from "./Routes/TransactionRoutes.js"
import InfoRoutes from "./Routes/InfoRoutes.js"
import { connectDB } from "./Lib/Db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:5173", "http://192.168.172.158:5173"],
        credentials: true,
    })
);



app.use("/Api/Auth", AuthRoutes)
app.use("/Api/Transaction", TransactionRoutes)
app.use("/Api/Info", InfoRoutes)


app.listen(PORT, () => {
    console.log("Server Running..")
    connectDB()
})