import express from "express";
import categoriesRouter from "./routers/categoriesRouter.js"
import gamesRouter from "./routers/gamesRouter.js";
import customersRouter from "./routers/customersRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);


const port = process.env.PORT || 4000
app.listen(port, console.log(`Running in port ${port}`))