const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const auth = require('../middleware/auth');
const is_owner = require('../middleware/is_owner');

router.get('/', templateController.getTemplates);
router.post('/label/', templateController.getTemplateLabel);
router.get('/:id', templateController.getTemplateWithId);
router.put('/', auth, is_owner, templateController.uptadeTemplate);
router.post('/', auth, templateController.saveTemplate);
router.delete('/', auth, is_owner, templateController.deleteTemplate);
router.put('/fork/:id', auth, templateController.forkTemplate);


module.exports = router;