import joi, { number } from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern().required().min(10).max(11),
    cpf:joi.string().pattern().required().min(10).max(11),
    birthday:joi.date().required()
})