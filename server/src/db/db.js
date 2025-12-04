import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const uri = '';
    await mongoose.connect(uri);
  } catch (error) {}
};
