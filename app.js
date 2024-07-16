import express from "express";
import 'dotenv/config';
import dbConnect from "./dbConnect.js";
import productRoutes from "./routes/productsRoutes.js";
import cors from 'cors';
import {notFound} from './middleware/notFound.js';
import errorHandler from "./middleware/errorHandler.js";
import "express-async-errors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/",(req,res) => {
    res.send("<h1>Store-API</h1>")
})

app.use("/api/v1/products",productRoutes);
app.use(notFound);
app.use(errorHandler);

;(
    async() =>{
    try {
        await dbConnect(process.env.MONGO_URL);
        console.log("Database Connected...")
        app.listen(PORT,console.log("Server Started..."))
    } catch (error) {
        console.log(error);
    }
})
();