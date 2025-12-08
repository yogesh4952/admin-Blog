# Deploying to Render

## Prerequisites

1. MongoDB Atlas account (free tier available)
2. Render.com account (GitHub connected)
3. Server code pushed to separate GitHub repo

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (note username/password)
4. Whitelist IP address (0.0.0.0/0 for simplicity, or your IP)
5. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

## Step 2: Push to GitHub

From your separate server repo:

```bash
git add .
git commit -m "Initial server setup for Render deployment"
git push origin main
```

Files should include:

- ✅ `src/` - TypeScript source code
- ✅ `dist/` - Compiled JavaScript (or Render builds from source)
- ✅ `package.json` with build script
- ✅ `tsconfig.json`
- ✅ `.env.example`
- ✅ `README.md`

## Step 3: Create Web Service on Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account and select the server repo
4. Fill in details:
   - **Name**: `admin-blog-server`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `npm run build` (if using TypeScript)
   - **Start Command**: `npm start`
   - **Plan**: Free tier available

## Step 4: Add Environment Variables

In Render dashboard:

1. Go to your Web Service → **Environment**
2. Add variables:
   ```
   PORT=4000
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   NODE_ENV=production
   ```

## Step 5: Deploy

- Render auto-deploys on `git push`
- Check **Logs** tab for errors
- Your API will be live at: `https://admin-blog-server.onrender.com`

## Step 6: Update Client

In your React client, update the API base URL:

```typescript
// src/axiosInstance.ts
const axiosInstance = axios.create({
  baseURL: 'https://admin-blog-server.onrender.com',
});
```

## Important Notes

- **Free tier**: Spins down after 15 mins of inactivity (cold start delay)
- **MongoDB Atlas**: Free tier has 512MB storage
- **CORS**: Make sure server allows your client domain
- **Keep `.env` out of git** - Use `.gitignore`

## Troubleshooting

- **Build fails**: Check Node version matches locally
- **DB connection fails**: Verify MongoDB URI and IP whitelist
- **Server crashes**: Check logs in Render dashboard
- **CORS errors**: Ensure `cors()` middleware is before routes

Your server will be production-ready! 🚀
