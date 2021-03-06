const User = require('../../../../../models/user');
const constants = require('../../../../../functions/constants');
const bCryptPassword = require('../../../../../functions/bcryptpassword');
const apiError = require('../../../../../functions/apierror');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {
    try {
        let errors = [];

        let phone = req.body.phone;
        let password = req.body.password;
        let nickname = req.body.nickname;
        let role = req.body.role;
        let is_company = req.body.is_company;
        let company = req.body.company;
        let fio = req.body.fio;
        let gender = req.body.gender;
        let age = req.body.age;
        let location = req.body.location;
        let firebase_token = req.body.firebase_token;

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
                newUser.nickname = nickname;

                if (role === "admin") {
                    errors.push(apiError.createError("3", 'Нельзя регистрировать администратора'));
                    return res.status(401).json({
                        errors
                    });
                }

                if (is_company == 1 || is_company == "1") {
                    newUser.is_company = true;
                    newUser.company = company;
                    newUser.role = "legal_entity";
                    newUser.legal_type = 'company';
                } else {
                    newUser.role = "physical_entity";
                    newUser.is_company = false;
                    newUser.fio = fio;
                    newUser.gender = gender;
                    newUser.age = age;
                    newUser.legal_type = 'person';
                }

                newUser.location = location;
                newUser.firebase_token = firebase_token;
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

    } catch (err) {
        res.status(404).send();
        throw err;
    }
};


