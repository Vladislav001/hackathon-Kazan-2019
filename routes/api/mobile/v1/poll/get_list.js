const User = require('../../../../../models/user');
const Poll = require('../../../../../models/poll');

exports.get = async function (req, res) {
    try {
        let user = await User.findOne({_id: res.user._id});
        let polls = {};

        if (user.is_company == 1) {
            polls = await Poll.find({
                is_company: 1
            });
        } else if (user.is_company == 0) {
            let filter = {
                is_company: 0
            };
            if (user.gender) {
                filter.gender = user.gender;
            }
            if (user.age) {
                filter['age.min'] = {$lte: user.age};
                filter['age.max'] = {$gte: user.age};
            }

            polls = await Poll.find(filter);
        }

        res.status(200).send(polls);
    } catch (err) {
        throw err;
    }
};
