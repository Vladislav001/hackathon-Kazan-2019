const CommentPoll = require('../../../../../models/comment_poll');

exports.post = async function (req, res) {
    try {
        let poll_id = req.body.poll_id;
        let text = req.body.text;

        let newCommentPoll = new CommentPoll();
        newCommentPoll.poll_id = poll_id;
        newCommentPoll.text = text;

        newCommentPoll.save();
        res.status(200).send();
    } catch (err) {
        throw err;
    }
};