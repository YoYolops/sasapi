import express from 'express';
import cors from 'cors';
import recommendationRouter from './routers/recommendationsRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/recommendations', recommendationRouter);

export default app;
