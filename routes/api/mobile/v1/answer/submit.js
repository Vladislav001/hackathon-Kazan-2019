const Answer = require('../../../../../models/answer');
const Question = require('../../../../../models/question');

exports.post = async function (req, res) {
    try {
        req.body.forEach(function (item, i, arr) {
            let question_id = item.question_id;
            let text = item.text;
            let rating = item.rating;

            Question.findOne({_id: question_id}, function (error, result) {
                if (result) {
                    let newAnswer = new Answer();
                    newAnswer.user_id = res.user._id;
                    newAnswer.question_id = question_id;
                    newAnswer.text = text;
                    newAnswer.rating = rating;
                    newAnswer.save();
                    res.status(200).send();
                } else {
                    res.status(404).send();
                }
            });
        });


    } catch (err) {
        res.status(404).send();
        throw err;
    }
};
