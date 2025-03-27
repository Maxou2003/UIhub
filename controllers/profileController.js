const Template = require('../models/Template');
const User = require('../models/User');
var mongoose = require('mongoose');

exports.getProfile = (req,res) => {
    let fav;
    let all;
    let name;

    Template.find({owner: parseInt(req.auth.userId), favorite: true })
        .then(fav => {favorite = fav, 
            Template.find({owner: parseInt(req.auth.userId)})
            .then(others => all = others, 
                User.findOne({_id: new mongoose.Types.ObjectId(req.auth.userId)})
                .then(u => res.status(200).json({username: u.username, favorite: fav, template: all}))
                .catch(error => res.status(405).json({ error})))
            .catch(error => res.status(406).json({ error}))})
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