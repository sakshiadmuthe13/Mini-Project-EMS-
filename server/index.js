import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectToDatabase from './db/db.js';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectToDatabase();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);

// Error fallback
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ success: false, error: 'Server error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/test", (req, res) => {
    res.send("Server is working!");
  });
  
