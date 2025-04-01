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
    // req.body.owner = parseInt(req.auth.userId);
    req.body.owner = req.auth.userId;
    const template = new Template({
        ...req.body
    });
    template.save()
        .then(() => res.status(201).json({ message: 'Template saved' }))
        .catch(error => res.status(400).json({ error }));
}

exports.uptadeTemplate = (req, res) => {
    const id = { _id: req.body._id };
    delete req.body._id;
    Template.findOneAndUpdate(id, req.body)
        .then(() => res.status(200).json({ message: 'Template updated' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteTemplate = (req, res) => {
    Template.deleteOne({ _id: req.body._id })
        .then(() => res.status(200).json({ message: "Template deleted" }))
        .catch(error => res.status(401).json({ error }));

}

exports.forkTemplate = (req, res) => {
    Template.findOne({ _id: req.params.id })
        .then(template => {
            if (template.public == false) {
                res.status(401).json({ message: "Template must be in public" });
                return;
            }
            if (req.auth.userId == template.owner) {
                res.status(401).json({ message: "This template is already yours" });
                return;
            }
            delete template._id;
            const n_template = new Template({
                html: template.html,
                css: template.css,
                owner: req.auth.userId,
                label: template.label,
                public: true,
                favorite: false,
            });
            n_template.save()
                .then(() => res.status(200).json({ message: "Template forked" }))
                .catch(error => res.status(401).json({ error, message: "Can't save the template" }))
        })
        .catch(error => res.status(401).json({ error, message: "Can't find the template" }))
}
