const CompletedPoll = require('../../../../../models/completed_poll');

exports.post = async function (req, res) {
    try {
        let poll_id = req.body.poll_id;
        let newCompletedPoll= new CompletedPoll();
        newCompletedPoll.poll_id = poll_id;
        newCompletedPoll.user_id = res.user._id;

        newCompletedPoll.poll_id = poll_id;
        res.status(200).send();
    } catch (err) {
        throw err;
    }
};