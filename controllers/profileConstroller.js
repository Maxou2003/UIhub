const Template = require('../models/Template');
const User = require('../models/User');

exports.getProfile = (req,res) => {
    let fav;
    let all;
    let name;

    Template.find({owner: req.auth, favorite: true })
        .then(fav => fav = favorite)
        .catch(error => res.status(400).json({ error}));
    Template.find({owner: req.auth})
        .then(others => all = others)
        .catch(error => res.status(400).json({ error}));
    User.findOne({_id: req.auth})
        .then(u => name = u.username)
        .catch(error => res.status(400).json({ error}));
    
    res.status(200).json({username: name, favorite: fav, template: all});
}

exports.getBanner = (req, res) => {
    User.findOne({_id: req.auth})
    .then(u => res.sendFile(path.join(__dirname, u.banner_image)))
        .catch(error => res.status(400).json({ error}));
}

exports.getImage = (req, res) => {
    User.findOne({_id: req.auth})
        .then(u => res.sendFile(path.join(__dirname, u.profile_image)))
        .catch(error => res.status(400).json({ error}));
}