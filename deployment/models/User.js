const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);