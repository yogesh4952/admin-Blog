import type { Request, Response } from 'express';
import blog from '../models/blog.js';
import mongoose, { Error } from 'mongoose';

export const postBlog = async (req: Request, res: Response) => {
  try {
    const { title, author, content, language } = req.body;
    if (!title || !author || !content || !language)
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

export const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: 'Invalid blog ID',
      });
    }

    const data = await blog.findById(id);

    if (!data) {
      return res.json({
        success: false,
        message: 'Blog not found',
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: 'Internal Server error',
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: 'Invalid blog ID',
      });
    }

    const data = await blog.findByIdAndDelete(id);

    if (!data) {
      return res.json({
        success: false,
        message: 'Blog not found',
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: 'Internal Server error',
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, content, language } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: 'Invalid blog ID',
      });
    }

    const updateData: Record<string, string> = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (content) updateData.content = content;
    if (language) updateData.language = language;

    if (Object.keys(updateData).length === 0) {
      return res.json({
        success: false,
        message: 'No fields to update',
      });
    }

    const updatedBlog = await blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.json({
        success: false,
        message: 'Blog not found',
      });
    }

    return res.json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.json({
        success: false,
        message: error.message,
      });

    return res.json({
      success: false,
      message: 'Internal server error',
    });
  }
};
