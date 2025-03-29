const Template = require('../models/Template');
const User = require('../models/User');
var mongoose = require('mongoose');
const path = require('path');

exports.getProfile = (req, res) => {

    Template.find({ owner: req.auth.userId, favorite: true })
        .then(fav => {
            Template.find({ owner: req.auth.userId })
                .then(others => {
                    User.findOne({ _id: new mongoose.Types.ObjectId(req.auth.userId) })
                        .then(u => res.status(200).json({ username: u.username, favorite: fav, template: others }))
                        .catch(error => res.status(405).json({ error }))
                })
                .catch(error => res.status(406).json({ error }))
        })
        .catch(error => res.status(407).json({ error }));
}

exports.getBanner = (req, res) => {
    User.findOne({ _id: new mongoose.Types.ObjectId(req.auth.userId) })
        .then(u => {
            res.status(200).sendFile(path.join(path.dirname(__dirname), "images", u.banner_image))
        })
        .catch(error => res.status(400).json({ error }));
}

exports.getImage = (req, res) => {
    User.findOne({ _id: new mongoose.Types.ObjectId(req.auth.userId) })
        .then(u => {
            res.status(200).sendFile(path.join(path.dirname(__dirname), "images", u.profile_image))
        })
        .catch(error => res.status(401).json({ error }));
}

exports.putBanner = (req, res) => {
    const id = { _id: new mongoose.Types.ObjectId(req.auth.userId) };
    User.findOne(id)
        .then(user => {
            delete user._id,
                user.banner_image = req.body.banner,
                User.findOneAndUpdate(id, user)
                    .then(() => res.status(200).json({ message: 'Profile updated' }))
                    .catch(error => res.status(400).json({ error }));
        }).catch(error => res.status(400).json({ error }));
}

exports.putImage = (req, res) => {
    const id = { _id: new mongoose.Types.ObjectId(req.auth.userId) };
    User.findOne(id)
        .then(user => {
            delete user._id,
                user.profile_image = req.body.image,
                User.findOneAndUpdate(id, user)
                    .then(() => res.status(200).json({ message: 'Profile updated' }))
                    .catch(error => res.status(400).json({ error }));
        }).catch(error => res.status(400).json({ error }));
}