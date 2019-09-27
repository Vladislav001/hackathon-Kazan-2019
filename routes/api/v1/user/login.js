const User = require('../../../../models/user');
const constants = require('../../../../functions/constants');
const apiError = require('../../../../functions/apierror');
const bCryptPassword = require('../../../../functions/bcryptpassword');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let errors = [];

    User.findOne({ 'email': email }, function (err, user) {
        if (err) throw err;

        if (!user) {
            errors.push(apiError.createError("2", 'Вы ввели неверную почту или пароль'));
            return res.status(401).json({
                errors
            });
        }

        if (!bCryptPassword.isValidPassword(user, password)) {
            errors.push(apiError.createError("2", 'Вы ввели неверную почту или пароль'));
            return res.status(401).json({
                errors
            });
        }

        let token = jwt.sign({ id: user._id }, constants.SECRET_STRING, {
            expiresIn: constants.TIME_LIFE_TOKEN
        });

        User.updateOne({
            "_id": user._id
        }, {
            $set: {
                "token": token,
            }
        }, function (err, results) {
            if (err) throw err;

            res.status(200).json({
                "token": token
            });
        });
    });
};
