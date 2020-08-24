const httpStatus = require('http-status');
const sendOTPhlp = require('../helpers/sendotp');
const msghlp = require('../helpers/messages.js');
const regvalidate = require('../validations/reg_user');
const loginvalidate = require('../validations/login');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('otplib/authenticator');
const user = require('../models/user');
const otptbl = require('../models/otp');
auth.options = {
    crypto
};
const accessTokenSecret = 'Y$1^@#%^&Q1';

const userController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    /*=============== User API's================*/
    const verify_otp = async (req, res, next) => {
        try {
            const postData = req.body;
            const bodyValidationResult = loginvalidate.verifyotp.validate({ email: postData.emailId, otp: postData.otp })
            msghlp.required_error(bodyValidationResult, res);
            await user.findOne({ emailId: postData.emailId })
                .then(async (userData) => {
                    if (userData === null) {
                        return res.status(httpStatus.BAD_REQUEST)
                            .json({ statusCode: httpStatus.BAD_REQUEST, status: false, msg: "Incorrect emailId" })
                    }
                    else {
                        await otptbl.findOne({ userid: userData.id, otp: postData.otp })
                            .then((otpData) => {
                                console.log(otpData);
                                let now = Date.now();
                                if (now > parseInt(otpData.expires)) {
                                    return res
                                        .status(httpStatus.BAD_REQUEST)
                                        .json({ statusCode: httpStatus.BAD_REQUEST, status: false, msg: "OTP expired." })
                                } else {
                                    const accessToken = jwt.sign({ username: postData.emailId }, accessTokenSecret);
                                    return res.status(httpStatus.OK)
                                        .json({ statusCode: httpStatus.OK, status: true, msg: "OTP verified successfully" ,token:accessToken})
                                }
                            })
                    }

                })
        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: false, error: err });
        }
    }
    const send_Otp = async (req, res, next) => {
        try {
            const postData = req.body;
            const bodyValidationResult = loginvalidate.sendotp.validate({ email: postData.emailId })
            msghlp.required_error(bodyValidationResult, res);
            await user.findOne({ emailId: postData.emailId }).then((userData) => {
                if (userData === null) {
                    return res.status(httpStatus.NO_CONTENT).json({ statusCode: httpStatus.NO_CONTENT, status: false, msg: 'Couldnot find your mailId' });
                } else {
                    sendOTPhlp(postData.emailId, async function (response) {
                        if (response.status) {
                            let OTP = new otptbl({
                                userid: userData.id,
                                otp: response.otp_value,
                                expires: response.expires
                            })
                            await OTP.save().then((savedOtp) => {
                                return res.status(httpStatus.OK)
                                    .json({ statusCode: httpStatus.OK, status: true, msg: "OTP send successfully" })
                            })
                        }
                    })
                }

            })

        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: false, error: err });
        }
    }
    const reg_user = async (req, res, next) => {
        try {
            const postData = req.body;
            let value = { email: postData.emailId };
            const bodyValidationResult = regvalidate.schema.validate(value)
            msghlp.required_error(bodyValidationResult, res);
            let users = new user(postData);
            if (!users) { return res.status(400).json({ success: false, error: err }) }
            await user.findOne({ emailId: postData.emailId }).then(async (userData) => {
                if (userData === null) {
                    await users.save().then(async (savedUsers) => {
                        return res.status(200).json({ status: true, statusCode: 200, msg: "Register successfully" })
                    })
                } else {
                    return res.status(409).json({ status: false, statusCode: 409, msg: "mailId already exist" })
                }
            })
        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: 'error', error: err });
        }
    }
    const timer = (req, res, next) => {
        return res.json({ responseContent: `2020-10-19 23:55:24`, statusCode: 200, message: 'Success' });
    }
    // --------------------------------------------return----------------------------------
    return {
        reg_user,
        verify_otp,
        send_Otp,timer
    };
};


module.exports = userController();