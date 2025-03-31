const Template = require('../models/Template');


module.exports = (req, res, next) => {
    try {
        const id = { _id: req.body._id };
        Template.findOne(id)
            .then(template => {
                if (template.owner == req.auth.userId) {
                    next();
                } else {
                    res.status(401).json({ message: "You must be the owner of the template" });
                }
            })
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(401).json({ error });
    }
}