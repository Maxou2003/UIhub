const Template = require('../models/Template');
const User = require('../models/User');
var mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { error } = require('console');

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


exports.getOtherBanner = (req, res) => {
    User.findOne({ _id: new mongoose.Types.ObjectId(req.params.user) })
        .then(u => {
            res.status(200).sendFile(path.join(path.dirname(__dirname), "images", u.banner_image))
        })
        .catch(error => res.status(401).json({ error }));
}

exports.getOtherImage = (req, res) => {
    User.findOne({ _id: new mongoose.Types.ObjectId(req.params.user) })
        .then(u => {
            res.status(200).sendFile(path.join(path.dirname(__dirname), "images", u.profile_image))
        })
        .catch(error => res.status(401).json({ error }));
}


exports.getOtherProfile = (req, res) => {
    Template.find({ owner: req.params.user, favorite: true, public: true })
        .then(fav => {
            Template.find({ owner: req.params.user, public: true })
                .then(others => {
                    User.findOne({ _id: new mongoose.Types.ObjectId(req.params.user) })
                        .then(u => res.status(200).json({ username: u.username, favorite: fav, template: others }))
                        .catch(error => res.status(401).json({ error }))
                })
                .catch(error => res.status(406).json({ error }))
        })
        .catch(error => res.status(407).json({ error }));
}

exports.putProfile = (req, res) => {
    const id = {_id:req.auth.userId};
    User.findOne(id)
        .then( user => {
            const old_banner = user.banner_image;
            const old_profile = user.profile_image;
            let toChange = {};
            if (req.files.profileImage){
                toChange["profile_image"] = req.files.profileImage[0].filename;
            }if (req.files.bannerImage){
                toChange["banner_image"] = req.files.bannerImage[0].filename;
            }if (req.body.username){
                toChange["username"] = req.body.username;
            }
            User.findOneAndUpdate(id,toChange)
                .then(() => {
                    let suppError = {};
                    if (req.files.profileImage && old_banner != "d_banner.png"){
                        fs.unlink(path.join(path.dirname(__dirname), 'images',old_banner), (err) => {
                            if (err) {
                                suppError["banner"] = "Erreur lors de la suppression du fichier :", err;
                            }});
                    }if (req.files.bannerImage && old_profile != "d_profile.png"){
                        fs.unlink(path.join(path.dirname(__dirname), 'images',old_profile), (err) => {
                            if (err) {
                                suppError["profile"] = "Erreur lors de la suppression du fichier :", err;
                            }});
                    }
                    if (Object.keys(suppError).length > 0){
                        res.status(401).json({suppError, message:"Can't delete the file"});
                        return;
                    }
                    res.status(200).json({message:"Profile updated"});
                })
                .catch(error => res.status(401).json({error, message:"Can't update the profile"}))
        }).catch(error => res.status(401).json({error, message:"Can't find the user"}));
}