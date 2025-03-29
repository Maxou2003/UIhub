const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, require: true, unique: true },
    profile_image: {type: String, default: "d_profile.png"},
    banner_image: {type: String, default: "d_banner.png"},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);