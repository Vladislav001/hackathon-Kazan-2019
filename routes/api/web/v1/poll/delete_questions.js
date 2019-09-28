const Question = require('../../../../../models/question');
const Answer = require('../../../../../models/answer');

exports.post = async function (req, res) {
    // try{
        await Answer.deleteOne({"question_id": req.body.id});
        await Question.deleteOne({"_id": req.body.id});
        res.status(200).send('');
    // }
    // catch (err) {
    //     res.status(403).send('');
    //     throw err;
    // }
    
}