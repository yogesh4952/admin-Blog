import express from 'express';
import { postBlog } from '../controllers/blogController.js';
const app = express.Router();

app.post('/post-blog', postBlog);

export default app;
