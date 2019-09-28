const mongoose = require('mongoose');

const likeCommentSchema = mongoose.Schema({
    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    liked_user_id: {
        type: String
    },
    is_like: {
        type: Number
    }
});

module.exports = mongoose.model('Like_Comment', likeCommentSchema);