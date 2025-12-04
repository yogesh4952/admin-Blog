import express from 'express';
import type { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('I am live');
});
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Server started');
});
