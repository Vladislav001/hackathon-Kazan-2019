const Answer = require('../../../../../models/answer');
const Question = require('../../../../../models/question');

exports.post = async function (req, res) {
    try {
        let question_id = req.body.question_id;
        let text = req.body.text;
        let rating = req.body.rating;

        let question = await Question.findOne({"_id": question_id});
        if (question) {
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

    } catch (err) {
        res.status(404).send();
        throw err;
    }
};
