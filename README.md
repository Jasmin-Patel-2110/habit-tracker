# 🎯 Habit Tracker

A beautiful, full-stack habit tracking application built with React, TypeScript, and Node.js. Track your daily habits, build streaks, and achieve your goals with an intuitive calendar heatmap and progress visualization.

![Habit Tracker Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## ✨ Features

- **📊 Dashboard Overview**: View summary statistics and earned badges
- **🔥 Streak Tracking**: Track current and longest streaks for each habit
- **📅 Calendar Heatmap**: Visualize your habit completion over time
- **🏆 Badge System**: Earn badges for milestones and achievements
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **⚡ Real-time Updates**: Instant feedback when logging habits
- **🎨 Modern UI**: Beautiful interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   cp env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd client
   npm install
   cp env.example .env
   # Edit .env with your backend URL
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/habits

## 📦 Deployment

### Frontend (Vercel)

1. **Connect your GitHub repository to Vercel**
2. **Set build configuration:**

   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add environment variable:**

   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

4. **Deploy!** 🚀

### Backend (Render/Railway)

1. **Connect your GitHub repository**
2. **Set environment variables:**

   ```
   MONGODB_URI=your-mongodb-atlas-uri
   NODE_ENV=production
   PORT=5000
   ```

3. **Build settings:**

   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Deploy!** 🚀

## 📁 Project Structure

```
habit-tracker/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── api/          # API helpers
│   │   └── utils/        # Utility functions
│   ├── public/           # Static assets
│   └── dist/             # Build output
├── server/               # Backend Node.js app
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route controllers
│   │   └── utils/        # Utility functions
│   └── dist/             # Build output
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/habits`         | Get all habits       |
| POST   | `/api/habits`         | Create new habit     |
| PUT    | `/api/habits/:id`     | Update habit         |
| DELETE | `/api/habits/:id`     | Delete habit         |
| POST   | `/api/habits/:id/log` | Log habit completion |
| GET    | `/health`             | Health check         |

## 🎨 Features in Detail

### Dashboard Overview

- Total habits count
- Today's completion rate
- Earned badges display
- Quick stats summary

### Habit Management

- Create habits with custom titles and frequencies
- Mark habits as complete/incomplete
- View detailed streak information
- Calendar heatmap visualization

### Badge System

- **Streak Master**: 7+ day streak
- **Consistency King**: 30+ day streak
- **Habit Builder**: 5+ habits created
- **Completion Champion**: 100+ total completions

### Calendar Heatmap

- 30-day activity visualization
- Color-coded completion status
- Hover tooltips with details
- Responsive grid layout

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend CORS is configured for your frontend domain
   - Check environment variables are set correctly

2. **MongoDB Connection**

   - Verify MongoDB URI is correct
   - Ensure network access is configured in Atlas

3. **Build Failures**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript compilation: `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using React and Node.js
- Icons from [Heroicons](https://heroicons.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Ready to build better habits?** 🚀

[Live Demo](https://habit-tracker.vercel.app) | [Backend API](https://habit-tracker-api.onrender.com)
