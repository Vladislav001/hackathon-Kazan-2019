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
    token: {
        type: String,
    },
    role: {
        type: String, // admin, legal_entity, physical_entity
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);