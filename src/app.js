import express from 'express';
import cors from 'cors';
import recommendationRouter from './routers/recommendationsRouter.js';
import serverErrorHandler from './middlewares/serverError.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/recommendations', recommendationRouter);
app.use(serverErrorHandler);

export default app;
