import React, { useState } from "react";
import clsx from "clsx";
import { IHabit, logHabit } from "../api/habitApi";
import CalendarHeatmap from "./CalendarHeatmap";

interface HabitCardProps {
  habit: IHabit;
  onHabitUpdated: (updatedHabit: IHabit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onHabitUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Check if habit is completed for today
  const today = new Date().toISOString().split("T")[0];
  const todayLog = habit.logs.find((log) => log.date === today);
  const isCompletedToday = todayLog?.completed || false;

  const handleLogHabit = async (completed: boolean) => {
    setIsLoading(true);
    try {
      const updatedHabit = await logHabit(habit._id, completed);
      onHabitUpdated(updatedHabit);
    } catch (error) {
      console.error("Error logging habit:", error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (isCompletedToday) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✅ Done
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        ⏳ Not yet
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {habit.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 capitalize">
              {habit.frequency}
            </span>
            {getStatusBadge()}
          </div>
        </div>
      </div>

      {/* Streak Information */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {habit.streakData.currentStreak}
          </div>
          <div className="text-xs text-gray-600">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {habit.streakData.longestStreak}
          </div>
          <div className="text-xs text-gray-600">Longest Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {habit.streakData.totalCompleted}
          </div>
          <div className="text-xs text-gray-600">Total Completed</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleLogHabit(!isCompletedToday)}
          disabled={isLoading}
          className={clsx(
            "flex-1 px-4 py-2 rounded-md font-medium transition-colors",
            isCompletedToday
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : isCompletedToday ? (
            "Mark as Incomplete"
          ) : (
            "Mark as Complete"
          )}
        </button>

        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
        >
          {showHeatmap ? "Hide" : "Show"} Calendar
        </button>
      </div>

      {/* Calendar Heatmap */}
      {showHeatmap && (
        <div className="border-t pt-4">
          <CalendarHeatmap logs={habit.logs} daysToShow={30} />
        </div>
      )}
    </div>
  );
};

export default HabitCard;
