import recommendationService from '../services/recommendationService.js';
import errorIsKnown from './errorDetectorHelper.js';

async function postRecommendation(req, res, next) {
    if (!req.body.name || !req.body.youtubelink) return res.sendStatus(400);

    try {
        const response = await recommendationService.register(req.body);
        return res.status(201).send(response);
    } catch (error) {
        if (errorIsKnown(error)) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
}

async function postVote(req, res, next) {
    const { id, type } = req.params;

    if (type !== 'upvote' && type !== 'downvote') return res.sendStatus(405);

    try {
        const voteResult = await recommendationService.vote(id, 1, type);
        return res.status(200).send(voteResult);
    } catch (error) {
        if (errorIsKnown(error)) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
}

async function getTopRecommendations(req, res, next) {
    const { amount } = req.params;

    if (!Number(amount)) return res.sendStatus(422);

    try {
        const topRecommendations = await recommendationService.topRecommendations(amount);
        return res.send(topRecommendations);
    } catch (error) {
        if (errorIsKnown(error)) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
}

const recommendationController = {
    postRecommendation,
    postVote,
    getTopRecommendations,
};

export default recommendationController;
