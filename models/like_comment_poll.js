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
    }
});

module.exports = mongoose.model('LikeComment', likeCommentSchema);