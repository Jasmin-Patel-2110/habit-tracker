import { IHabitLog } from '../models/Habit';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
}

export const calculateStreak = (logs: IHabitLog[]): StreakData => {
  if (!logs || logs.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalCompleted: 0,
    };
  }

  // Sort logs by date in descending order (most recent first)
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  // Filter only completed logs
  const completedLogs = sortedLogs.filter(log => log.completed);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate current streak (consecutive days from most recent)
  const today = new Date().toISOString().split('T')[0];
  let currentDate = new Date(today);

  for (const log of sortedLogs) {
    if (log.completed) {
      const logDate = new Date(log.date);
      const daysDiff = Math.floor(
        (currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff <= 1) {
        currentStreak++;
        currentDate = logDate;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  // Calculate longest streak and total completed
  let prevDate: Date | null = null;

  for (const log of completedLogs) {
    const logDate = new Date(log.date);

    if (prevDate === null) {
      tempStreak = 1;
    } else {
      const daysDiff = Math.floor(
        (prevDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    prevDate = logDate;
  }

  // Don't forget to check the last streak
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    currentStreak,
    longestStreak,
    totalCompleted: completedLogs.length,
  };
};
