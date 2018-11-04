import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(8)
    .email(),
  password: Joi.string()
    .required()
    .min(8)
});
