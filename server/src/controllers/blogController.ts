import type { Request, Response } from 'express';
import blog from '../models/blog.js';

export const postBlog = async (req: Request, res: Response) => {
  try {
    const { title, author, description } = req.body;
    if (!title || !author || !description)
      return res.json({
        success: false,
        message: 'All fields are required',
      });

    const data = { title, author, description };
    await blog.create(data);
    return res.json({
      success: true,
      message: 'Post success',
    });
  } catch (error) {
    if (error instanceof Error)
      return res.json({
        success: false,
        message: error.message,
      });
  }
};
