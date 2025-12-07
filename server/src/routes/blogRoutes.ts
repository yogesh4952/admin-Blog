import express from 'express';
import {
  getAllBlog,
  postBlog,
  getSingleBlog,
} from '../controllers/blogController.js';
const app = express.Router();

app.get('/get-all-blogs', getAllBlog);
app.post('/post-blog', postBlog);
app.get('/get-blog/:id', getSingleBlog);

export default app;
