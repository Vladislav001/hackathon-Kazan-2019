const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
    }
});

module.exports = mongoose.model('Example', exampleSchema);