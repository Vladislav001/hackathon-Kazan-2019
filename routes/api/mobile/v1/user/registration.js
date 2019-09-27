const User = require('../../../../../models/user');
const constants = require('../../../../../functions/constants');
const bCryptPassword = require('../../../../../functions/bcryptpassword');
const apiError = require('../../../../../functions/apierror');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {

    let errors = [];

    let phone = req.body.phone;
    let password = req.body.password;
    let role = req.body.role;
    console.log(role);
    User.findOne({'phone': phone}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            errors.push(apiError.createError("1", 'Пользователь с таким номером уже зарегистрирован'));
            return res.status(401).json({
                errors
            });
        } else {
            let newUser = new User();
            newUser.phone = phone;
            newUser.password = bCryptPassword.createHash(password);

            if(role === "admin")
            {
                newUser.role = 'physical_entity';
            }
            else
            {
                newUser.role = role;
            }

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


