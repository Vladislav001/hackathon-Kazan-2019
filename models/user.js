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
    legal_type: {
      type: String // null, 'company', 'person'
    },
    company: {
        type: String,
    },
    fio: {
        type: String,
    },
    gender: {
        type: String, // male, female
    },
    age: {
        type: Number
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);