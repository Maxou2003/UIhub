const Template = require('../models/Template');

exports.getTemplates = (req, res) => {
    Template.find({ public: true }).limit(45)
        .then(templates =>
            res.status(200).json({ templates }))
        .catch(error => res.status(500({ error })));
}

exports.getTemplateWithId = (req, res) => {
    Template.findOne({ _id: req.params.id })
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
        .catch(error => res.status(400).json({ error }));
}

exports.uptadeTemplate = (req, res) => {
    const id = {_id: req.body.id};
    delete req.body.id;
    Template.findOneAndUpdate(id, req.body)
        .then(() => res.status(200).json({message: 'Template updated'}))
        .catch(error => res.status(400).josn({ error}));
}

exports.deleteTemplate = (req, res) => {
    Template.deleteOne({_id: req.body.id})
        .then(() => res.status(200).json({message: "Template deleted"}))
        .catch(error => res.status(401).json({ error}));

}
