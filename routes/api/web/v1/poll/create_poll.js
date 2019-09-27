const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');

exports.post = function (req, res) {
    try {

        let newPoll = new Poll();
        newPoll.title = req.body.title;
        newPoll.text = req.body.text;
        newPoll.image = req.body.image;
        newPoll.video = req.body.video;
        newPoll.geo = req.body.geo;
        newPoll.date_created = new Date().getTime();

        req.body.questions.forEach(function(item, i, arr) {
        let newQuestion = new Question();
        newQuestion.title = item.title;
        newQuestion.type = item.type;
        newQuestion.options = item.options;
        newQuestion.poll_id = newPoll._id;
        newQuestion.save();
        });

        

        // let newOption = new Option();
        // newOption.text = req.body.text;
        // newOption.question_id = req.body.question_id;

        newPoll.save();
        res.status(200).send('');
    } catch (err) {
        res.status(403).send('');
        throw err;
    }
}