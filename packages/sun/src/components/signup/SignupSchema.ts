import Joi from 'joi'

export const registrationSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(8)
    .email(),
  password: Joi.string()
    .required()
    .min(8),
  name: Joi.string().required(),
})
