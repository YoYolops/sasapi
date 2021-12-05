import recommendationSchema from '../schemas/recommendationSchema.js';
import UnformattedDataError from '../errors/UnformattedDataError.js';
import recommendationRepository from '../repositories/recommendationRepository.js';
import ConflictError from '../errors/ConflictError.js';
import NotFoundError from '../errors/NotFoundError.js';

/**
 * This is a local function used to verify if the inserted link is from youtube, since Joi does not
 * check the domain
 * @param {object} body request body
 * @returns {object} object
 * @property {boolean} isValid if body fufill requirements
 * @property {string | null} message error message in case body does not fufill requirements
 */
function validateRecommendationBody(body) {
    if (recommendationSchema.validate(body).error) {
        return {
            isValid: false,
            message: 'Unformatted entity',
        };
    }
    if (!body.youtubeLink.includes('www.youtube.com')) {
        return {
            isValid: false,
            message: 'youtubeLink property should be a youtube domain url',
        };
    }
    if (!body.name.includes(' - ')) {
        return {
            isValid: false,
            message: 'Name propertie should have the artist and song name separated by " - "',
        };
    }
    return {
        isValid: true,
    };
}

function formatResponseData(data) {
    return {
        id: data.id,
        name: `${data.artist} - ${data.name}`,
        youtubeLink: data.ytlink,
        score: data.score,
    };
}

async function register(body) {
    const dataValidation = validateRecommendationBody(body);
    if (!dataValidation.isValid) throw new UnformattedDataError(dataValidation.message);

    const { name, youtubeLink } = body;

    const splittedName = name.split(' - ');
    const artist = splittedName[0];
    const song = splittedName[1];

    const alreadyRegisteredSong = await recommendationRepository.findByName(song, artist);
    if (alreadyRegisteredSong) throw new ConflictError('This song is already registered');

    const response = await recommendationRepository.create(song, artist, youtubeLink);
    return formatResponseData(response);
}

async function vote(songId, value, type) {
    const songDoesExist = await recommendationRepository.findById(songId);
    if (!songDoesExist) throw new NotFoundError('The id provided does not match any registered recommendation');

    const voteResult = await recommendationRepository.changeScore(songId, value, type);
    if (!voteResult) throw new NotFoundError('The song was deleted before the vote could be computed');

    if (voteResult.score < -5) {
        await recommendationRepository.deleteById(voteResult.id);
        return {};
    }
    return formatResponseData(voteResult);
}

async function topRecommendations(amount) {
    const recommendations = await recommendationRepository.getTop(amount);
    const formattedData = recommendations.map((obj) => formatResponseData(obj));
    return formattedData;
}

async function randomRecommendation(random) {
    let drawn;
    if (random <= 0.3) {
        drawn = await recommendationRepository.getRandom('score < 11');
    } else {
        drawn = await recommendationRepository.getRandom('score > 10');
    }

    if (!drawn) drawn = await recommendationRepository.getRandom();
    if (!drawn) throw new NotFoundError('There is not any song registered yet');

    return formatResponseData(drawn);
}

const recommendationService = {
    register,
    vote,
    topRecommendations,
    randomRecommendation,
    validateRecommendationBody,
    formatResponseData,
};

export default recommendationService;
