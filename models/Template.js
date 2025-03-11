const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    label: {type: String, require: true},
    html: { type: String, required: true},
    css: { type: String, required: true },
    owner: {type: Number, required: true},
    public: {type: Boolean, require: true},

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Template', userSchema);