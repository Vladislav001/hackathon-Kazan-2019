const CompletedPoll = require('../../../../../models/completed_poll');

exports.get = async function (req, res) {
    try {
        let completedPolls = await CompletedPoll.find({
            user_id: res.user._id
        });

        res.status(200).send(completedPolls);
    } catch (err) {
        throw err;
    }
};
