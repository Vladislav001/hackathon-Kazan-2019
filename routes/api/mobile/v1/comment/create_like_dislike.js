const LikeCommentPoll = require('../../../../../models/like_comment_poll');
const CommentPoll = require('../../../../../models/comment_poll');

exports.post = async function (req, res) {
    try {
        let poll_id = req.body.poll_id;
        let comment_id = req.body.comment_id;
        let liked_user_id = req.body.liked_user_id;
        let is_like = req.body.is_like;

        let likeComment = await LikeCommentPoll.findOne({
            "comment_id": comment_id, "liked_user_id": liked_user_id
        });

        if (!likeComment) {
            let newLikeCommentPoll = new LikeCommentPoll();
            newLikeCommentPoll.poll_id = poll_id;
            newLikeCommentPoll.comment_id = comment_id;
            newLikeCommentPoll.liked_user_id = liked_user_id;

            if (is_like == 1) {
                newLikeCommentPoll.is_like = 1;
                await CommentPoll.updateOne({
                    "_id": comment_id
                }, {
                    $inc: {count_likes: 1, count_dislikes: -1},
                });
            } else if (is_like == 0) {
                newLikeCommentPoll.is_like = 0;
                await CommentPoll.updateOne({
                    "_id": comment_id,
                }, {
                    $inc: {count_likes: -1, count_dislikes: 1},
                });
            }

            newLikeCommentPoll.save();
        } else {
            if (is_like == 1) {
                await CommentPoll.updateOne({
                    "_id": comment_id
                }, {
                    $inc: {count_likes: 1, count_dislikes: -1},
                });

                await LikeCommentPoll.updateOne({
                    "_id": likeComment._id
                }, {
                    $set: {
                        "is_like": 1
                    }
                });
            } else if (is_like == 0) {

                await CommentPoll.updateOne({
                    "_id": comment_id
                }, {
                    $inc: {count_likes: 1, count_dislikes: -1},
                });

                await LikeCommentPoll.updateOne({
                    "_id": likeComment._id
                }, {
                    $set: {
                        "is_like": 0
                    }
                });
            }
        }

        res.status(200).send();
    } catch (err) {
        throw err;
    }
};