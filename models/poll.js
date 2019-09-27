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
    geo: {
        type: Object,
    },
    date_created: {
        type: String,
    },
    is_company: {
        type: Number,
    },
    age: {
        type: Object,
    },
    gender: {
        type: String,
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Poll', pollSchema);