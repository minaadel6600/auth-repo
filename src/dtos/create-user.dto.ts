
export const createUserValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),

  lastName: Joi.string().required(),

  // repeat_password: Joi.any().valid(Joi.ref('password')).required().messages({
  //   'any.only' : 'Passwords must match'
  // }),

  email: Joi.string().email({
    minDomainSegments: 2, // the minimum number of domain segments (e.g. x.y.z has 3 segments)
    tlds: { allow: ['com', 'net'] }, // allowed domains
  }).required(),
});
