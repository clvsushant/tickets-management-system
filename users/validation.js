const Joi = require('joi');

exports.createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Must be a valid email address',
    }),
  password: Joi.string().required().min(6).messages({
    'any.required': 'Password is required',
    'string.min': 'Minimum 6 characters required',
  }),
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Minimum 3 characters required.',
    'string.max': 'Maximum 30 characters required.',
  }),
});

exports.loginUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Must be a valid email address',
    }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'Password is required' }),
});
