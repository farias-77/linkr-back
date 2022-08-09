import joi from "joi";

export const schemas = {
    signUpSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        username: joi.string().required(),
        profilePicture: joi.string().uri().required()
    }),
    signInSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
}