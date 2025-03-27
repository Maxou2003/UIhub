const Template = require('../models/Template');
const User = require('../models/User');
var mongoose = require('mongoose');

exports.getProfile = (req,res) => {
    let fav = {};

    Template.find({owner: parseInt(req.auth.userId)})
        .then(templates => {
                for (const [key, value] of Object.entries(templates)) {
                    if (value.favorite) {
                    fav[key] = value;
                    }
                }
                console.log("test"),
                User.findOne({_id: new mongoose.Types.ObjectId(req.auth.userId)})
                .then(u => res.status(200).json({username: u.username, favorite: fav, template: others}))
                .catch(error => res.status(405).json({ error}))})
        .catch(error => res.status(407).json({ error}));
}

exports.getBanner = (req, res) => {
    User.findOne({_id: req.auth.userId})
    .then(u => res.sendFile(path.join(__dirname, u.banner_image)))
    .catch(error => res.status(400).json({ error}));
}

exports.getImage = (req, res) => {
    User.findOne({_id: req.auth.userId})
        .then(u => res.sendFile(path.join(__dirname, u.profile_image)))
        .catch(error => res.status(400).json({ error}));
}