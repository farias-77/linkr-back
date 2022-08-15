import joi from "joi";

export const registerPostSchema = joi.object({
    userId: joi.number().empty().required(),
    url: joi.string().empty().required(),
    text: joi.string()
})

export const editPostSchema = joi.object({
    text: joi.string().empty().required()
})