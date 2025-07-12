import { Request, Response } from 'express';
import { Habit, IHabit } from '../models/Habit';
import { calculateStreak } from '../utils/streak';

// Create a new habit
export const createHabit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, frequency = 'daily' } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      res
        .status(400)
        .json({ error: 'Title is required and must be a non-empty string' });
      return;
    }

    if (frequency && !['daily', 'weekly'].includes(frequency)) {
      res
        .status(400)
        .json({ error: 'Frequency must be either "daily" or "weekly"' });
      return;
    }

    const habit = new Habit({
      title: title.trim(),
      frequency,
      logs: [],
    });

    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

// Get all habits with their logs
export const getAllHabits = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });

    // Add streak data to each habit
    const habitsWithStreaks = habits.map(habit => {
      const streakData = calculateStreak(habit.logs);
      return {
        ...habit.toObject(),
        streakData,
      };
    });

    res.status(200).json(habitsWithStreaks);
  } catch (error) {
    console.error('Error fetching habits:', error);
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

// Log a habit for a specific date (or today by default)
export const logHabit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, completed = true } = req.body;

    if (!id) {
      res.status(400).json({ error: 'Habit ID is required' });
      return;
    }

    // Validate date format or use today
    let logDate: string;
    if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        res.status(400).json({ error: 'Date must be in YYYY-MM-DD format' });
        return;
      }
      logDate = date;
    } else {
      logDate = new Date().toISOString().split('T')[0];
    }

    // Check if habit exists
    const habit = await Habit.findById(id);
    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    // Check if log already exists for this date
    const existingLogIndex = habit.logs.findIndex(log => log.date === logDate);

    if (existingLogIndex !== -1) {
      // Update existing log
      habit.logs[existingLogIndex].completed = completed;
    } else {
      // Add new log
      habit.logs.push({
        date: logDate,
        completed,
      });
    }

    const updatedHabit = await habit.save();
    const streakData = calculateStreak(updatedHabit.logs);

    res.status(200).json({
      ...updatedHabit.toObject(),
      streakData,
    });
  } catch (error) {
    console.error('Error logging habit:', error);
    res.status(500).json({ error: 'Failed to log habit' });
  }
};

// Delete a habit
export const deleteHabit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Habit ID is required' });
      return;
    }

    const deletedHabit = await Habit.findByIdAndDelete(id);

    if (!deletedHabit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};

// Get a single habit by ID
export const getHabitById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Habit ID is required' });
      return;
    }

    const habit = await Habit.findById(id);

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    const streakData = calculateStreak(habit.logs);

    res.status(200).json({
      ...habit.toObject(),
      streakData,
    });
  } catch (error) {
    console.error('Error fetching habit:', error);
    res.status(500).json({ error: 'Failed to fetch habit' });
  }
};
