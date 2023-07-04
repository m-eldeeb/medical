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
      city: Joi.string().required(),
      specialization: Joi.string().required(),
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
const updateSchema = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().required(),
      phone: Joi.string().min(11).max(11),
      city: Joi.string().required(),
      address: Joi.string().required(),
      specialization: Joi.string().required(),
    }),
};


module.exports = { signupShema, signinShema ,updateSchema};