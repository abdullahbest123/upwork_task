import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorMiddleware';

import UserRoutes from './routes/UserRoutes'


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/user', UserRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
