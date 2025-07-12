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
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Progress
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {totalHabits}
              </div>
              <div className="text-sm text-blue-700">Total Habits</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {totalCompletions}
              </div>
              <div className="text-sm text-green-700">Total Completions</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">
                {maxCurrentStreak}
              </div>
              <div className="text-sm text-purple-700">Best Current Streak</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">
                {completedToday}
              </div>
              <div className="text-sm text-orange-700">Completed Today</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              + Create New Habit
            </Link>

            {earnedBadges.length > 0 && (
              <div className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">🏆</span>
                {earnedBadges.length} badges earned
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Badges Earned
            </h2>
            {earnedBadges.length > 0 && (
              <span className="text-sm text-gray-500">
                {earnedBadges.length} of {badges.length}
              </span>
            )}
          </div>

          <BadgeDisplay badges={badges} maxDisplay={6} />

          {earnedBadges.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
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
