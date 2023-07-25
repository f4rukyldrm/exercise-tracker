const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Exercise', ExerciseSchema);