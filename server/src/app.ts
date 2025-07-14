import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import habitRoutes from './routes/habitRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/habit-tracker';

// Configure CORS for production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [String(process.env.FRONTEND_URL), 'http://localhost:5173']
        : [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
          ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// API routes
app.use('/api/habits', habitRoutes);

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'OK', message: 'Habit Tracker API is running' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      // console.log(`Server running on port ${PORT}`);
      // console.log(`API available at http://localhost:${PORT}/api/habits`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
