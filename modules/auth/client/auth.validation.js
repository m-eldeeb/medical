const Joi = require("joi");

const signupShema = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp(/^\w{5,6}$/)),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
      phone: Joi.string().min(11).max(11),
      address: Joi.string().required(),
      bloodType: Joi.string().required(),
      gender: Joi.string().required().valid('Male','Female'),
    }),
};

const signinShema = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp(/^\w{5,6}$/)),
    }),
};
module.exports = { signupShema, signinShema };