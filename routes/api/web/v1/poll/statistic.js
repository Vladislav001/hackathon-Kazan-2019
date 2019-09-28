const Question = require('../../../../../models/question');
const User = require('../../../../../models/user');
const Poll = require('../../../../../models/poll');
const Answer = require('../../../../../models/answer');

exports.post = async function (req, res) {
    const pollId = req.body.id;
    let poll = await Poll.findOne({_id: pollId});
    if (poll) {
        var questions = await Question.find({'poll_id': pollId});

        const result = {};

        questions.forEach(function (question) {
            result[question._id] = {};
            if (question.type == 'rating') {
                for (let i = 1; i <= 5; i++) {
                    result[question._id][i] = 0;
                }
            } else if (question.type == 'select') {
                question.options.forEach((option) => {
                    result[question._id][option] = 0;
                });
            }
        });

        const answers = await Answer.find({});

        answers.forEach((answer) => {
            if (result[answer.question_id]) {
                if (answer.rating) {
                    result[answer.question_id][answer.rating]++;
                } else if (answer.text) {
                    result[answer.question_id][answer.text]++;
                }
            }
        });


        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
};