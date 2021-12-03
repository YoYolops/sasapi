import recommendationSchema from '../schemas/recommendationSchema.js';
import UnformattedDataError from '../errors/UnformattedDataError.js';
import recommendationRepository from '../repositories/recommendationRepository.js';
import ConflictError from '../errors/ConflictError.js';
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
    if (!body.youtubelink.includes('youtube')) {
        return {
            isValid: false,
            message: 'youtubelink property should be a youtube domain url',
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

async function register(body) {
    const dataValidation = validateRecommendationBody(body);
    if (!dataValidation.isValid) throw new UnformattedDataError(dataValidation.message);

    const { name, youtubelink } = body;

    const splittedName = name.split(' - ');
    const artist = splittedName[0];
    const song = splittedName[1];

    const alreadyRegisteredSong = await recommendationRepository.find(song, artist);
    if (alreadyRegisteredSong) throw new ConflictError('This song is already registered');

    const response = await recommendationRepository.create(song, artist, youtubelink);
    return response;
}

const recommendationService = {
    register,
};

export default recommendationService;
