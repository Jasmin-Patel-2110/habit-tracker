import { IHabit } from "../api/habitApi";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
}

export const generateBadges = (habits: IHabit[]): Badge[] => {
  const badges: Badge[] = [
    {
      id: "first-habit",
      name: "First Steps",
      description: "Created your first habit",
      icon: "🌱",
      color: "bg-green-100 text-green-800",
      earned: false,
    },
    {
      id: "habit-builder",
      name: "Habit Builder",
      description: "Created 3 or more habits",
      icon: "🧱",
      color: "bg-blue-100 text-blue-800",
      earned: false,
    },
    {
      id: "streak-5",
      name: "5-Day Streak",
      description: "Maintained a 5-day streak on any habit",
      icon: "🔥",
      color: "bg-orange-100 text-orange-800",
      earned: false,
    },
    {
      id: "streak-10",
      name: "10-Day Streak",
      description: "Maintained a 10-day streak on any habit",
      icon: "🔥🔥",
      color: "bg-red-100 text-red-800",
      earned: false,
    },
    {
      id: "streak-30",
      name: "30-Day Streak",
      description: "Maintained a 30-day streak on any habit",
      icon: "🔥🔥🔥",
      color: "bg-purple-100 text-purple-800",
      earned: false,
    },
    {
      id: "completion-10",
      name: "10 Completions",
      description: "Completed any habit 10 times",
      icon: "✅",
      color: "bg-green-100 text-green-800",
      earned: false,
    },
    {
      id: "completion-50",
      name: "50 Completions",
      description: "Completed any habit 50 times",
      icon: "🏆",
      color: "bg-yellow-100 text-yellow-800",
      earned: false,
    },
    {
      id: "completion-100",
      name: "Century Club",
      description: "Completed any habit 100 times",
      icon: "💎",
      color: "bg-purple-100 text-purple-800",
      earned: false,
    },
    {
      id: "multi-habit",
      name: "Multi-Habit Master",
      description: "Completed multiple habits on the same day",
      icon: "⭐",
      color: "bg-indigo-100 text-indigo-800",
      earned: false,
    },
    {
      id: "weekly-warrior",
      name: "Weekly Warrior",
      description: "Created a weekly habit",
      icon: "📅",
      color: "bg-teal-100 text-teal-800",
      earned: false,
    },
  ];

  // Calculate badge eligibility
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.streakData.totalCompleted,
    0
  );
  const maxCurrentStreak = Math.max(
    ...habits.map((h) => h.streakData.currentStreak),
    0
  );
  const maxLongestStreak = Math.max(
    ...habits.map((h) => h.streakData.longestStreak),
    0
  );
  const hasWeeklyHabit = habits.some((h) => h.frequency === "weekly");

  // Check for multi-habit completion (same day)
  const today = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter((habit) => {
    const todayLog = habit.logs.find((log) => log.date === today);
    return todayLog?.completed || false;
  }).length;

  // Award badges based on criteria
  badges.forEach((badge) => {
    switch (badge.id) {
      case "first-habit":
        badge.earned = totalHabits >= 1;
        break;
      case "habit-builder":
        badge.earned = totalHabits >= 3;
        break;
      case "streak-5":
        badge.earned = maxCurrentStreak >= 5 || maxLongestStreak >= 5;
        break;
      case "streak-10":
        badge.earned = maxCurrentStreak >= 10 || maxLongestStreak >= 10;
        break;
      case "streak-30":
        badge.earned = maxCurrentStreak >= 30 || maxLongestStreak >= 30;
        break;
      case "completion-10":
        badge.earned = totalCompletions >= 10;
        break;
      case "completion-50":
        badge.earned = totalCompletions >= 50;
        break;
      case "completion-100":
        badge.earned = totalCompletions >= 100;
        break;
      case "multi-habit":
        badge.earned = completedToday >= 2;
        break;
      case "weekly-warrior":
        badge.earned = hasWeeklyHabit;
        break;
    }
  });

  return badges;
};
