import express from 'express';
import { getAllBlog, postBlog } from '../controllers/blogController.js';
const app = express.Router();

app.get('/get-all-blogs', getAllBlog);
app.post('/post-blog', postBlog);

export default app;
