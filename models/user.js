const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    firebase_token: {
        type: String,
    },
    role: {
        type: String, // admin, legal_entity, physical_entity
        required: true
    },
    is_company: {
        type: Number,
    },
    company: {
        type: String,
    },
    fio: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);