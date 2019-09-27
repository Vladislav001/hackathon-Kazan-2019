const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    web_token: {
        type: String,
    },
    mobile_token: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);