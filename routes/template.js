const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplateWithId);
router.put('/', templateController.uptadeTemplate);
router.post('/', templateController.saveTemplate);
router.delete('/', templateController.deleteTemplate);

module.exports = router;