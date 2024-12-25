const Joi = require('joi')


const createBookSchemaValidator = Joi.object({
    author: Joi.string().trim().required(),
    title: Joi.string().min(2).max(255).trim().required(),
    year: Joi.number().integer().required(),
    price: Joi.string().trim().optional().allow(null)
});


const updateBookSchemaValidator = Joi.object({
    author: Joi.string().trim().allow(null),
    title: Joi.string().min(2).max(255).trim().allow(null),
    year: Joi.number().integer().allow(null),
    price: Joi.string().trim().optional().allow(null)
});

const validateOpts = {
    abortEarly: false,
    convert: true,
    stripUnknown: false
};


const createValidator = (data) => {
    const { error, value, warning } = createBookSchemaValidator.validate(data, validateOpts);
    return {
        error: error?.details.map(d => d.message.replace(/"/g, '')),
        value,
        warning,
    };
};



const updateValidator = (data) => {
    const { error, value, warning } = updateBookSchemaValidator.validate(data, validateOpts);
    return {
        error: error ? error.details.map(d => d.message.replace(/"/g, '')) : null,
        value,
        warning,
    };
};


module.exports = {
    createValidator,
    updateValidator,
    schemas: {
        createBookSchemaValidator,
        updateBookSchemaValidator,
    },
};