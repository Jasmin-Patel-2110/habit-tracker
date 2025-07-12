import { Router } from 'express';
import {
  createHabit,
  getAllHabits,
  getHabitById,
  logHabit,
  deleteHabit
} from '../controllers/habitController';

const router = Router();

// Create a new habit
router.post('/', createHabit);

// Get all habits
router.get('/', getAllHabits);

// Get a single habit by ID
router.get('/:id', getHabitById);

// Log a habit for a specific date (or today by default)
router.put('/:id/log', logHabit);

// Delete a habit
router.delete('/:id', deleteHabit);

export default router; 