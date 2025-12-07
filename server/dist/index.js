import express from 'express';
import { configDotenv } from 'dotenv';
import connectDb from './db/db.js';
configDotenv();
const app = express();
app.get('/', (req, res) => {
    res.send('I am live');
});
const port = process.env.PORT || 4000;
connectDb();
app.listen(port, () => {
    console.log('Server started');
});
//# sourceMappingURL=index.js.map