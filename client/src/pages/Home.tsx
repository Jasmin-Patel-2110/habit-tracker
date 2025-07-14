import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Build Better Habits Today
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
                Transform Your Life
                <span className="block text-blue-600 dark:text-blue-400">
                  One Habit at a Time
                </span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                Track your daily habits, build powerful streaks, and achieve
                your goals with our beautiful and intuitive habit tracker. Join
                thousands of people who have transformed their lives through
                consistent habit building.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">
              Everything You Need to Build Better Habits
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive habit tracking system provides all the tools you
              need to create lasting change in your life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Visual Progress Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful calendar heatmaps show your progress at a glance. See
                your streaks and patterns develop over time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Streak Building
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your current and longest streaks. Build momentum and stay
                motivated with our intelligent streak system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Achievement Badges
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Earn badges for milestones and achievements. Celebrate your
                progress and stay motivated with our reward system.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Mobile Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your habits anywhere, anytime. Our app works perfectly on
                desktop, tablet, and mobile devices.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Privacy First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data stays private and secure. We don't track you or sell
                your information to third parties.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Real-time Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                See your progress update instantly. No waiting, no refreshing -
                just immediate feedback on your habits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of people who have already started building better
            habits. It only takes a few minutes to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </Link>
            <Link
              to="/create"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Create Your First Habit
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold">HabitTracker</span>
            </div>
            <p className="text-gray-400 mb-4">
              Built with ❤️ to help you build better habits
            </p>
            <div className="text-sm text-gray-500">
              © 2025 HabitTracker. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
