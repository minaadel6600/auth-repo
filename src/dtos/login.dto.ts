import Joi from 'joi';

const LoginDtoSchema = Joi.object({ 
  password: Joi.any().required().messages({ 'any.required': `Password is a required field` }),
  email: Joi.string().email({
    minDomainSegments: 2, // the minimum number of domain segments (e.g. x.y.z has 3 segments)
    tlds: { allow: ['com', 'net'] }, // allowed domains
  }).required()
});

export default LoginDtoSchema;