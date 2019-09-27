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
        type: Number
    },
    count_dislikes: {
        type: Number
    }
});

module.exports = mongoose.model('Comment', commentPollSchema);