const Joi = require("@hapi/joi");




// Validation
const registerValidation = (data) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schema.validate(data)

}




module.exports.registerValidation = registerValidation;
