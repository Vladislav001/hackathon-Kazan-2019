const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    get: {
        type: Object
    }
});

module.exports = mongoose.model('Poll', pollSchema);