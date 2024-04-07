import Joi from 'joi';

const LoginDtoSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),

  lastName: Joi.string().required(),
  password: Joi.any().required().messages({ 'any.required': `is a required field` }),
  email: Joi.string().email({
    minDomainSegments: 2, // the minimum number of domain segments (e.g. x.y.z has 3 segments)
    tlds: { allow: ['com', 'net'] }, // allowed domains
  }).required()
});

export default LoginDtoSchema;