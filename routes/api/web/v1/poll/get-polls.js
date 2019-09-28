const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');

exports.get = async function (req, res) {
    // let polls = await Poll.find();
    let polls = await Poll.find({});
    let questions = await Question.find({});
    res.status(200).send({polls, questions});
    // try {
    //     let user = await User.findOne({_id: res.user._id});

    //     let polls = await Poll.find({
    //         is_company: user.is_company,
    //         gender: user.gender,
    //         'age.min': {$lte: user.age},
    //         'age.max': {$gte: user.age}
    //         //location: user.location,
    //     });

    //     res.status(200).send(polls);
    // } catch (err) {
    //     throw err;
    // }
};