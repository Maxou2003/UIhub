const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, require: true, unique: true },
    profile_image: {type: String, require: false},
    banner_image: {type: String, require: false},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);