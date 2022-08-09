import joi from "joi";

export const schemas = {
    signUpSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        username: joi.string().required(),
        userPicture: joi.string().required()
    })
}