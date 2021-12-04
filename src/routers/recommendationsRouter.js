import { Router } from 'express';
import recommendationController from '../controllers/recommendationController.js';

const routes = Router();

routes.post('', recommendationController.postRecommendation);
routes.post('/:id/:type', recommendationController.postVote);

routes.get('/top/:amount', recommendationController.getTopRecommendations);
routes.get('/random', recommendationController.getRandomRecommendation);

export default routes;
