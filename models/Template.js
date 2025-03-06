const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    html: { type: String, required: true, unique: true },
    css: { type: String, required: true },
    owner: {type: ObjectID, required: true},
    public: {type: Boolean, require: true},

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Template', userSchema);