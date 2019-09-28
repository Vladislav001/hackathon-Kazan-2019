const Poll = require('../../../../../models/poll');
const Questions = require('../../../../../models/question');

exports.get = async function (req, res) {
    try {
        let data = {};

        let poll = await Poll.findOne({
            "_id": req.params.id
        });

        if (poll) {
            data._id = poll._id;
            data.title = poll.title;
            data.text = poll.text;
            data.video = poll.video;
            data.date_created = poll.date_created;
            data.is_company = poll.is_company;
            data.age = poll.age;
            data.gender = poll.gender;

            let questions = await Questions.find({poll_id: poll._id});
            data.questions = questions;

            res.status(200).send(data);
        } else {
            res.status(404).send();
        }

    } catch (err) {
        res.status(404).send();
        throw err;
    }
};
