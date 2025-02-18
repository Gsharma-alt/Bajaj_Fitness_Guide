// server.js
import express from 'express';
//import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from "././routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ['http://localhost:5176', 'http://127.0.0.1:5176'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
  });
});



app.use("/api/auth",authRoutes)
app.listen(PORT, () => {
  console.log("App Started on port: " + PORT);
  connectDB();
});