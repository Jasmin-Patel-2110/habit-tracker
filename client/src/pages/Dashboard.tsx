import React, { useState, useEffect } from "react";
import { getAllHabits, IHabit } from "../api/habitApi";
import HabitCard from "../components/HabitCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Navigation from "../components/Navigation";
import DashboardOverview from "../components/DashboardOverview";

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedHabits = await getAllHabits();
      setHabits(fetchedHabits);
    } catch (err) {
      setError("Failed to load habits. Please try again.");
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHabitUpdated = (updatedHabit: IHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit._id === updatedHabit._id ? updatedHabit : habit
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your habits..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Habits
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchHabits}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-6 gap-4 md:gap-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base">
                Track your daily habits and build streaks
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Today
              </div>
              <div className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
        {habits.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Habits Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
              You haven't created any habits yet. Start by adding your first
              habit!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={fetchHabits}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 dark:bg-gray-800 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
              >
                Refresh
              </button>
              <a
                href="/create"
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors inline-block"
              >
                Create Your First Habit
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Dashboard Overview */}
            <DashboardOverview habits={habits} />

            {/* Habits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {habits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onHabitUpdated={handleHabitUpdated}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
