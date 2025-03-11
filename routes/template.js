const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplateWithId)
router.post('/', templateController.saveTemplate);

module.exports = router;