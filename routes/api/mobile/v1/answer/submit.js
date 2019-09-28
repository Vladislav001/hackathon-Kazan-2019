const Answer = require('../../../../../models/answer');
const Question = require('../../../../../models/question');
const CompletedPoll = require('../../../../../models/completed_poll');

exports.post = async function (req, res) {
    try {
        let poll_id = req.body.poll_id;

        req.body.answers.forEach(function (item, i, arr) {
            let question_id = item.question_id;
            let text = item.text;
            let rating = item.rating;

            Question.findOne({_id: question_id}, function (error, question) {
                if (question) {
                    Answer.findOne({question_id: question_id, user_id: res.user._id}, function (error, answer) {
                        if (!answer) {
                            let newAnswer = new Answer();
                            newAnswer.user_id = res.user._id;
                            newAnswer.question_id = question_id;
                            newAnswer.text = text;
                            newAnswer.rating = rating;
                            newAnswer.save();
                        }
                    });
                }
            });
        });

        let completedPoll = await CompletedPoll.findOne({poll_id: poll_id, user_id: res.user._id});
        if (!completedPoll) {
            let newCompletedPoll = new CompletedPoll();
            newCompletedPoll.poll_id = poll_id;
            newCompletedPoll.user_id = res.user._id;
            newCompletedPoll.save();
        }

        res.status(200).send();

    } catch (err) {
        res.status(404).send();
        throw err;
    }
};
