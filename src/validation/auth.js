import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

export const resetPwdSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
  token: Joi.string().required(),
});
