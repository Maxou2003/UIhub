const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const templateSchema = mongoose.Schema({
    label: { type: String, require: true },
    html: { type: String, required: true },
    css: { type: String, required: true },
    owner: { type: String, required: true },
    public: { type: Boolean, require: true },
    favorite: { type: Boolean, default: false },

});

templateSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Template', templateSchema);