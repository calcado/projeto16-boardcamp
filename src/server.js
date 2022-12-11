import express from "express";
import dotenv from "dotenv"
dotenv.config();


const app = express();


const port = process.env.DATABASE_URL || 4000
app.listen(port, console.log(`Running in port ${port}`))