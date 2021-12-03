import recommendationService from '../services/recommendationService.js';
import ConflictError from '../errors/ConflictError.js';
import UnformattedDataError from '../errors/UnformattedDataError.js';

async function postRecommendation(req, res, next) {
    if (!req.body.name || !req.body.youtubelink) return res.sendStatus(400);

    try {
        const response = await recommendationService.register(req.body);
        return res.status(201).send(response);
    } catch (error) {
        if (error instanceof ConflictError || error instanceof UnformattedDataError) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
}

const recommendationController = {
    postRecommendation,
};

export default recommendationController;
