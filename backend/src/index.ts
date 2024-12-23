// src/index.ts
import express, { Request, Response } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import * as authController from './controllers/auth.controller';
import { protect } from './middleware/auth.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/auth/register', authController.register);

app.post('/api/auth/login', authController.login);

app.get('/api/auth/verify', authController.verifyToken);

app.post('/api/auth/refresh', authController.refresh);



const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});