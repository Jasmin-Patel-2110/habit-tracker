import React from "react";
import { Link } from "react-router-dom";
import { IHabit } from "../api/habitApi";
import { generateBadges } from "../utils/badge";
import BadgeDisplay from "./BadgeDisplay";

interface DashboardOverviewProps {
  habits: IHabit[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ habits }) => {
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.streakData.totalCompleted,
    0
  );
  const maxCurrentStreak = Math.max(
    ...habits.map((h) => h.streakData.currentStreak),
    0
  );
  const completedToday = habits.filter((habit) => {
    const today = new Date().toISOString().split("T")[0];
    const todayLog = habit.logs.find((log) => log.date === today);
    return todayLog?.completed || false;
  }).length;

  const badges = generateBadges(habits);
  const earnedBadges = badges.filter((badge) => badge.earned);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8 dark:shadow-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Progress
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalHabits}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-200">
                Total Habits
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalCompletions}
              </div>
              <div className="text-sm text-green-700 dark:text-green-200">
                Total Completions
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {maxCurrentStreak}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-200">
                Best Current Streak
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {completedToday}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-200">
                Completed Today
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm"
            >
              + Create New Habit
            </Link>

            {earnedBadges.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <span className="mr-2">🏆</span>
                {earnedBadges.length} badges earned
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Badges Earned
            </h2>
            {earnedBadges.length > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {earnedBadges.length} of {badges.length}
              </span>
            )}
          </div>

          <BadgeDisplay badges={badges} maxDisplay={6} />

          {earnedBadges.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hover over badges to see details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
