import User from '../models/User';
console.log("User", User)
import jwt from 'jsonwebtoken';
import Helper from '../config/helper';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { validationResult } = require("express-validator");

module.exports = {
    signup: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'Parameter missing', code: 422, errors: errors.array()
            })
        }
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            await User.findOne({ email: req.body.email, status: { $ne: "Delete" } }, (err, user) => {
                //console.log(err,user)
                if (err) {
                    return Helper.response(res, 500, "Internal server error.")
                }
                else if (!user) {
                    var userObject = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,

                    }
                    let user = new User(userObject);
                    user.save((error, result) => {
                        if (error) {
                            return Helper.response(res, 500, "Internal server error.")
                        }
                        else {
                            return Helper.response(res, 200, "Signup successfully.")
                        }
                    })
                }
                else {
                    return Helper.response(res, 400, "User aleady exist.")
                }
            })
        } catch (error) {
            return Helper.response(res, 500, "Server error.");
        }
    },
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'Parameter missing', code: 422, errors: errors.array()
            })
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return Helper.response(res, 400, "User not found.")
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return Helper.response(res, 400, "Invalid email or password.")
            }
            jwt.sign(
                { user: { id: user.id } },
                'jwt_secret',
                (err, token) => {
                    if (err) throw err;
                    var rsss = { "userData": user, token }
                    return Helper.response(res, 200, "Loggedin sucess!!.", rsss)
                }
            )
        } catch (error) {
            return Helper.response(res, 500, "Server error.");
        }
    },

    changePassowrd: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: 'Parameter missing', code: 422, errors: errors.array()
                })
            }
            console.log("useridf>>>>>", userId)
            const userId = req.user.id

            const { oldPassword, newPassword, confirmPassword } = req.body
            if (newPassword == confirmPassword) {
                await User.findOne({ _id: mongoose.Types.ObjectId(userId) }, async function (err, user) {
                    if (err) {
                        return Helper.response(res, 400, "Something went wrong.");
                    } else if (!user) {
                        return Helper.response(res, 400, "User not found.")
                    } else {
                        //console.log(user.password); return false;
                        let compare = await bcrypt.compare(oldPassword, user.password);
                        if (compare) {
                            let hashedPassword = await bcrypt.hash(newPassword, 12);
                            user.password = hashedPassword;
                            user.save(function (err, newResult) {
                                if (err) {
                                    console.log(err)
                                    return Helper.response(res, 400, "Something went wrong.");
                                }
                                else {
                                    return Helper.response(res, 200, "Password changed successfully.");
                                }
                            })
                        } else {
                            return Helper.response(res, 400, "Invalid old password.");
                        }
                    }
                });
            } else {
                return Helper.response(res, 400, "Password and confirm password doesnot match.");
            }

        } catch (error) {
            console.log(">>>>>>>", error)
            return Helper.response(res, 500, "Server error.");
        }
    }
}