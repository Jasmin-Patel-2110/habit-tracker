# 🚀 Deployment Guide

This guide will help you deploy the Habit Tracker application to production.

## 📋 Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **MongoDB Atlas**: Set up a free MongoDB Atlas cluster
3. **Vercel Account**: For frontend deployment
4. **Render/Railway Account**: For backend deployment

## 🔧 Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Account**

   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster (M0 Free tier)

2. **Configure Database Access**

   - Go to Database Access
   - Create a new database user
   - Set username and password

3. **Configure Network Access**

   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow all IPs)

4. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Step 2: Deploy to Render

1. **Connect Repository**

   - Go to [Render](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**

   - **Name**: `habit-tracker-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

3. **Set Environment Variables**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habit-tracker
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://habit-tracker-api.onrender.com`)

## 🎨 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Connect Repository**

   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**

   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**

   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project.vercel.app`

## 🔄 Alternative Backend Deployment (Railway)

### Step 1: Deploy to Railway

1. **Connect Repository**

   - Go to [Railway](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure Service**

   - Railway will auto-detect it's a Node.js app
   - Set the **Root Directory** to `server`
   - Add environment variables in the Variables tab

3. **Set Environment Variables**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habit-tracker
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Get your service URL from the deployment logs

## ✅ Post-Deployment Checklist

### Backend Verification

1. **Test Health Endpoint**

   ```bash
   curl https://your-backend-url.com/health
   ```

   Should return: `{"status":"OK","message":"Habit Tracker API is running"}`

2. **Test API Endpoints**
   ```bash
   curl https://your-backend-url.com/api/habits
   ```
   Should return an empty array or your habits

### Frontend Verification

1. **Test Frontend URL**

   - Open your Vercel URL in browser
   - Should load the Habit Tracker app
   - Check browser console for any errors

2. **Test API Connection**
   - Try creating a habit
   - Check if it connects to your backend
   - Verify environment variables are working

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Update backend CORS configuration in `server/src/app.ts`
   - Add your frontend domain to allowed origins

2. **MongoDB Connection Issues**

   - Verify MongoDB URI is correct
   - Check network access settings in Atlas
   - Ensure database user has proper permissions

3. **Build Failures**

   - Check build logs for TypeScript errors
   - Verify all dependencies are installed
   - Ensure environment variables are set

4. **Frontend Not Loading**
   - Check Vercel deployment logs
   - Verify build command and output directory
   - Check environment variables in Vercel dashboard

### Environment Variables Reference

**Backend (.env)**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habit-tracker
NODE_ENV=production
PORT=5000
```

**Frontend (.env)**

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

## 🎉 Success!

Once deployed, your Habit Tracker will be available at:

- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-backend-url.com/api`

Update your README.md with the actual URLs and share your deployed app! 🚀
