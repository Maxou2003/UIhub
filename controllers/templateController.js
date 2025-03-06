const Template = require('../models/Template');

exports.getFrontTemplates = (req, res) => {
    Template.find({}).limit(45)
        .then(templates =>
            res.status(200).json({templates}))
        .catch(error => res.status(500({error})));
}

exports.saveTemplate = (req, res) => {
    const template = new Template({
        html: req.body.html,
        css: req.body.css,
        owner: req.body.owner,
        public: req.body.public
    });
    template.save()
        .then(() => res.status(201).json({message: 'Template saved'}))
        .catch(error => res.status(400).json({ error}))
}