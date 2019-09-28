const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');
const Answer = require('../../../../../models/answer');
const Comment_Poll = require('../../../../../models/comment_poll');
const Completed_Poll = require('../../../../../models/completed_poll');
const Like_Comment = require('../../../../../models/like_comment_poll');

exports.post = async function (req, res) {
    // try{
        // let poll = Poll.findOne({'_id':req.body.id});
        let questions = await Question.find({'poll_id': req.body.id});
        questions.forEach(function(item, i, arr){
            Answer.deleteOne({"question_id": item.id});
        })
        await Question.deleteMany({'poll_id': req.body.id});
        await Like_Comment.deleteMany({'poll_id': req.body.id});
        await Comment_Poll.deleteMany({'poll_id': req.body.id});
        await Completed_Poll.deleteMany({'poll_id': req.body.id});
        await Poll.deleteOne({'_id': req.body.id});
        // await Answer.deleteOne({"question_id": req.body.id});
        // await Question.deleteOne({"_id": req.body.id});
        res.status(200).send({'status': 'ok'});
    // }
    // catch (err) {
    //     res.status(403).send('');
    //     throw err;
    // }
    
}