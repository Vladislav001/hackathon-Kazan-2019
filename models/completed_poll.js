const mongoose = require('mongoose');

const completedPollSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

module.exports = mongoose.model('CompletedPoll', completedPollSchema);