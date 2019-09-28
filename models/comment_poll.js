const mongoose = require('mongoose');

const commentPollSchema = mongoose.Schema({
    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String
    },
    count_likes: {
        type: Number,
        default: 0
    },
    count_dislikes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Comment_Poll', commentPollSchema);