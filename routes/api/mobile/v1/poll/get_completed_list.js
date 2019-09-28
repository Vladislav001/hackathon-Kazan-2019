const User = require('../../../../../models/user');
const CompletedPoll = require('../../../../../models/completed_poll');

exports.get = async function (req, res) {
    try {
        let user = await User.findOne({_id: res.user._id});

        let completedPolls = await Poll.find({
            is_company: user.is_company,
            gender: user.gender,
            'age.min': {$lte: user.age},
            'age.max': {$gte: user.age}
            //location: user.location,
        });

        res.status(200).send(polls);
    } catch (err) {
        throw err;
    }
};
