import Joi from 'joi';

const recommendationSchema = Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string().uri().required(),
});

export default recommendationSchema;
