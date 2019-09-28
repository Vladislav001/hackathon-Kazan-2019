const User = require('../../../../../models/user');

exports.post = function (req, res) {
    let firebaseToken = req.body.firebaseToken;
console.log(firebaseToken);
    User.updateOne({
        "_id": res.user._id
    }, {
        $set: {
            firebase_token: firebaseToken
        }
    }, function (err, results) {
        if (err) throw err;

        res.status(200).json({
            "text": "Данные успешно обновлены"
        });
    });
};
