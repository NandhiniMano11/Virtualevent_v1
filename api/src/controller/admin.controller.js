const httpStatus = require("http-status");
const sendInvitation = require('../helpers/sendInvitation');
const regvalidate = require('../validations/reg_user');
const idValidate = require('../validations/findbyId');
const user = require('../models/user');
const messagehlp = require('../helpers/messages.js');
const eventDoc = require('../models/event');
const adminController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    /*=============== User API's================*/
   
    const invite = async (req, res, next) => {
        try {
            const postData = req.body;
            let value = postData.email;
            const bodyValidationResult = regvalidate.schema.validate(value)
            messagehlp.required_error(bodyValidationResult, res);
            sendInvitation(postData.emailId, async function (response) {
                if (response.status) {
                    return res
                        .status(httpStatus.OK)
                        .json({ status: true, message: response.message })
                } else {
                    return res
                        .status(httpStatus.BAD_REQUEST)
                        .json({ status: false, error: response.message })

                }
            })

        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, error: err });
        }
    }

    const del_user = async (req, res, next) => {
        try {
            const postData = req.body;
            const value = { Id: postData.Id }
            postData.role = postData.role ? postData.role : 2
            const bodyValidationResult = idValidate.schema.validate(value)
            messagehlp.required_error(bodyValidationResult, res);
            await user.findById(postData.Id).then(async (userData) => {
                if (userData === null) {
                    return res
                        .status(httpStatus.BAD_REQUEST)
                        .json({ status: false, message: "Invalid user Id" });
                } else if (postData.role === 'admin' || postData.role === 1) {
                    await user.findByIdAndDelete(postData.Id).then((deletedUser) => {
                        return res
                            .status(httpStatus.OK)
                            .json({ status: true, message: "User deleted" })
                    })
                        .catch((err) => {
                            return res
                                .status(httpStatus.INTERNAL_SERVER_ERROR)
                                .json({ status: false, message: "Delete failed", error: err })
                        });
                } else {
                    return res
                        .status(httpStatus.FORBIDDEN)
                        .json({ status: false, message: "Delete access denied" })
                }
            })
        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, error: err });
        }
    }

    const userList = async (req, res, next) => {
        try {
            await user.find({ role: 2 }).then((userData) => {
                if (userData.length > 0) {
                    return res
                        .status(httpStatus.OK)
                        .json({ status: true, responseContent: userData })
                } else {
                    return res
                        .status(httpStatus.NO_CONTENT)
                        .json({ status: false, message: "No content found" })
                }
            })
        } catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, error: err });
        }
    }
    const addevent = async (req, res, next) => {
        try {
            const postData = req.body;
            let events = new eventDoc(postData);
            if (!events) { return res.status(400).json({ success: false, error: err }) }
            await events.save(postData).
                then(async (savedEvent) => {
                    return res.status(200).json({ status: true, statusCode: 200, msg: "Event added successfully" })
                })
        } catch (err) {
            console.log(err);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, error: err });
        }
    }
    const listevents = async (req, res, next) => {
        try {
            await eventDoc.find({ status: true }).then((eventData) => {
                if (eventData.length > 0) {
                    return res
                        .status(httpStatus.OK)
                        .json({ status: true, responseContent: eventData })
                } else {
                    return res
                        .status(httpStatus.NO_CONTENT)
                        .json({ status: false, message: "No content found" })
                }
            })
        } catch (err) {
            console.log(err);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, error: err });
        }
    }
    // --------------------------------------------return----------------------------------
    return {
        del_user,
        invite,
        userList,
        listevents,
        addevent
    };
};

module.exports = adminController();