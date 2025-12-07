import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();
const connectDB = async () => {
    const uri = process.env.DB_URI;
    if (!uri) {
        throw new Error('DB_URI not defined in envrionment variable');
    }
    try {
        const connection = await mongoose.connect(uri);
        console.log('Connected succesfully');
    }
    catch (error) {
        console.error('Mongodb connection error:', error);
    }
};
export default connectDB;
