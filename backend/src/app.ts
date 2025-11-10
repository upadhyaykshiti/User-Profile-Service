

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,               
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;
