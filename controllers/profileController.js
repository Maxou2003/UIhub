const Template = require('../models/Template');
const User = require('../models/User');
var mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

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
    let toChange = {};
    let old_banner = "";
    let old_profile = "";
    if (req.files.profileImage){
        toChange["profile_image"] = req.files.profileImage[0].filename;
        old_profile = User.findOne({_id:req.auth.userId})
            .then(u => {if (u.profile_image != "d_profile.png"){
                return u.profile_image
            }})
    }
    if (req.files.bannerImage){
        toChange["banner_image"] = req.files.bannerImage[0].filename;
        old_banner = User.findOne({_id:req.auth.userId})
            .then(u => {if (u.banner_image != "d_banner.png"){
                return u.banner_image
            }})
    }
    if (req.body.username){
        toChange["username"] = req.body.username;
    }
    const id = {_id: req.auth.userId};
    User.findOneAndUpdate(id,toChange)
        .then(() => {
            console.log("0");
            if (old_banner != ""){
                console.log("0.5");
                console.log(old_banner);
                console.log(path.join(path.dirname(__dirname), "images","test"));
                fs.unlink(path.join(path.dirname(__dirname), 'images',old_banner), (err) => {
                    console.log("1");
                    if (err) {
                      console.error('Erreur lors de la suppression du fichier :', err);
                      return;
                    }
                    console.log('Fichier supprimé avec succès :', old_banner);
                  });
            }
            console.log("2");
            if (old_profile){
                fs.unlink(old_profile);
            }
            res.status(200).json({message: "Username changed" });
        })
        .catch(error => res.status(402).json({ error , message: "Can't change the username"}))
}

