import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blog = mongoose.model('blog', BlogSchema);

export default blog;
