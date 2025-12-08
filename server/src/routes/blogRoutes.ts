import express from 'express';
import {
  getAllBlog,
  postBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} from '../controllers/blogController.js';
const app = express.Router();

app.get('/get-all-blogs', getAllBlog);
app.post('/post-blog', postBlog);
app.get('/get-blog/:id', getSingleBlog);
app.put('/update-blog/:id', updateBlog);
app.delete('/delete-blog/:id', deleteBlog);

export default app;
