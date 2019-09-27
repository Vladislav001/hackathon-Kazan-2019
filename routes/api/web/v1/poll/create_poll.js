const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');
const Option = require('../../../../../models/option');

exports.post = function (req, res) {
    try {

        let newPoll = new Poll();
        newPoll.title = req.body.title;
        newPoll.text = req.body.text;
        newPoll.image = req.body.image;
        newPoll.video = req.body.video;
        newPoll.geo = req.body.geo;
        newPoll.date_created = req.body.date_created;

        console.log(newPoll._id);
        // foreach 

        // let newQuestion = new Question();
        // newQuestion.title = req.body.title;
        // newQuestion.type = req.body.type;
        // newQuestion.poll_id = newPoll._id;

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