import Joi from 'joi';

const recommendationSchema = Joi.object({
    name: Joi.string().required(),
    youtubelink: Joi.string().uri().required(),
});

export default recommendationSchema;
