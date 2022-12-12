import express from "express";
import categoriesRouter from "./routers/categoriesRouter.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);


const port = process.env.PORT || 4000
app.listen(port, console.log(`Running in port ${port}`))