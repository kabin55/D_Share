import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { connectToDB } from "./config/db.js";
connectToDB();

const app = express();

export default app;
