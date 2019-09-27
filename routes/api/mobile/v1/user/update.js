const User = require('../../../../../models/user');
const constants = require('../../../../../functions/constants');

exports.post = function (req, res) {

    let token = req.headers['x-access-token'];

    let errors = [];
    let nickname = req.body.nickname;
    let company = req.body.company;
    let fio = req.body.fio;
    let gender = req.body.gender;
    let age = req.body.age;
    let location = req.body.location;

    User.updateOne({
        "token": token
    }, {
        $set: {
            nickname: nickname,
            company: company,
            fio: fio,
            gender: gender,
            age: age,
            location: location,
        }
    }, function (err, results) {
        if (err) throw err;

        res.status(200).json({
            "text": "Данные успешно обновлены"
        });
    });
};
