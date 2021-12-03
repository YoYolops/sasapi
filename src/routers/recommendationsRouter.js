import { Router } from 'express';
import recommendationController from '../controllers/recommendationController.js';

const routes = Router();

routes.post('', recommendationController.postRecommendation);

export default routes;
