# Blog Server API

A Node.js/Express server for managing blog posts with MongoDB.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example` and add your MongoDB URI
4. Build: `npm run build`
5. Start: `npm start` (production) or `npm run dev` (development)

## Environment Variables

- `PORT` - Server port (default: 4000)
- `DB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## API Endpoints

- `GET /` - Health check
- `POST /api/v1/post-blog` - Create a blog post
- `GET /api/v1/blogs` - Get all blog posts
- `GET /api/v1/blog/:id` - Get a specific blog post
- `PUT /api/v1/blog/:id` - Update a blog post
- `DELETE /api/v1/blog/:id` - Delete a blog post

## Deployment on Render

See `RENDER_DEPLOYMENT.md` for detailed instructions.
