const User = require('../../../../models/user');
const constants = require('../../../../functions/constants');
const bCryptPassword = require('../../../../functions/bcryptpassword');
const apiError = require('../../../../functions/apierror');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {

    let errors = [];

    let email = req.body.email;
    let password = req.body.password;

    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            errors.push(apiError.createError("1", 'Пользователь с такой почтой уже зарегистрирован'));
            return res.status(401).json({
                errors
            });
        } else {
            let newUser = new User();
            newUser.email = email;
            newUser.password = bCryptPassword.createHash(password);

            let token = jwt.sign({id: newUser._id}, constants.SECRET_STRING, {
                expiresIn: constants.TIME_LIFE_TOKEN
            });
            newUser.token = token;

            newUser.save(function (err) {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    "token": token
                });
            });
        }
    });
};


