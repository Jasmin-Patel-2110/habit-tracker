#!/bin/bash
# Development script - start both servers

echo "🚀 Starting Habit Tracker Development Environment..."

# Start backend
echo "📡 Starting backend server..."
cd server && npm run dev &

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd ../client && npm run dev &

echo "✅ Both servers are starting..."
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
wait 