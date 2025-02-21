import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.routes.js";
 // Added Community Routes

dotenv.config();

const app = express();
const PORT = 3000 ;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/community", communityRoutes); // Added Community API

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
  });
});

// Connect to Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err);
});
