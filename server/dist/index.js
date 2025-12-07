import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import connectDb from './db/db.js';
import blogRoute from './routes/blogRoutes.js';
configDotenv();
const app = express();
app.get('/', (req, res) => {
    res.send('I am live');
});
app.use(express.json());
app.use(cors());
app.use('/api/v1', blogRoute);
const port = process.env.PORT || 4000;
connectDb();
app.listen(port, () => {
    console.log('Server started');
});
