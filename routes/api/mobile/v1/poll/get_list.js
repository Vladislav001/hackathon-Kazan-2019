const User = require('../../../../../models/user');
const Poll = require('../../../../../models/poll');

exports.get = async function (req, res) {
    try {
        let user = await User.findOne({_id: res.user._id});
        let polls = {};

        if (user.legal_type == 'company') {
            polls = await Poll.find({
               // legal_type: 'company'
                "$or": [{
                    'legal_type': 'company'
                }, {
                    'legal_type': null
                }]
            });
        } else if (user.legal_type == 'person') {
            let filter = {
                //legal_type: 'person'
                "$or": [{
                    'legal_type': 'person'
                }, {
                    'legal_type': null
                }]
            };
            if (user.gender) {
                filter.gender = user.gender;
            }
            if (user.age) {
                filter['age.min'] = {$lte: user.age};
                filter['age.max'] = {$gte: user.age};
            }

            polls = await Poll.find(filter);
        } else if (user.legal_type == 'null' || !user.legal_type) {
            polls = await Poll.find({});
        }

        res.status(200).send(polls);
    } catch (err) {
        throw err;
    }
};
