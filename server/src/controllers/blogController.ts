import type { Request, Response } from 'express';
import blog from '../models/blog.js';
import { Error } from 'mongoose';

export const postBlog = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { title, author, content } = req.body;
    if (!title || !author || !content)
      return res.json({
        success: false,
        message: 'All fields are required',
      });

    const data = { title, author, content };
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

export const getAllBlog = async (req: Request, res: Response) => {
  try {
    const data = await blog.find({});
    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.json({
        success: false,
        message: error.message || 'Internal server error',
      });
  }
};
