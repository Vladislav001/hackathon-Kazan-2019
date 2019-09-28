const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');
const Answer = require('../../../../../models/answer');
const Comment_Poll = require('../../../../../models/comment_poll');
const Completed_Poll = require('../../../../../models/completed_poll');
const Like_Comment = require('../../../../../models/like_comment_poll');

exports.post = async function (req, res) {
    // try{
        // let poll = Poll.findOne({'_id':req.body._id});
        let questions = await Question.find({'poll_id': req.body._id});
        questions.forEach(function(item, i, arr){
            Answer.deleteOne({"question_id": item._id});
        })
        await Question.deleteMany({'poll_id': req.body._id});
        await Like_Comment.deleteMany({'poll_id': req.body._id});
        await Comment_Poll.deleteMany({'poll_id': req.body._id});
        await Completed_Poll.deleteMany({'poll_id': req.body._id});
        await Poll.deleteOne({'_id': req.body._id});
        // await Answer.deleteOne({"question_id": req.body._id});
        // await Question.deleteOne({"_id": req.body._id});
        res.status(200).send('');
    // }
    // catch (err) {
    //     res.status(403).send('');
    //     throw err;
    // }
    
}