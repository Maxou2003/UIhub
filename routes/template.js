const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const auth = require('../middleware/auth');

router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplateWithId);
router.put('/', auth, templateController.uptadeTemplate);
router.post('/', auth, templateController.saveTemplate);
router.delete('/', auth, templateController.deleteTemplate);


module.exports = router;