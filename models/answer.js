const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String
    },
    rating: {
        type: Number
    },
});

module.exports = mongoose.model('Answer', answerSchema);