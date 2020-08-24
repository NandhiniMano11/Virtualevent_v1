const Joi = require("joi");
const sendotp = Joi.object({
    email: Joi.string().email().required()
});
const verifyotp = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required()
})
module.exports = { sendotp, verifyotp };