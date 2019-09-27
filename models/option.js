const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    text: {
        type: String
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Question', optionSchema);