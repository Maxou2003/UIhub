const Template = require('../models/Template');

exports.getTemplates = (req, res) => {
    Template.find({ public: true }).limit(45)
        .then(templates =>
            res.status(200).json({ templates }))
        .catch(error => res.status(500({ error })));
}

exports.getTemplateWithId = (req, res) => {
    Template.findOne({ _id: req.query.id })
        .then(template => {
            if (template == null) {
                res.status(401).json({ message: 'Unknow id in the DB' })
            } else {
                res.status(200).json({ template })
            }
        })
        .catch(error => res.status(500).json({ error }));
}

exports.saveTemplate = (req, res) => {
    const template = new Template({
        ...req.body
    });
    template.save()
        .then(() => res.status(201).json({ message: 'Template saved' }))
        .catch(error => res.status(400).json({ error }))
}