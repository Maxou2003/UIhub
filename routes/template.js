const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/getFront', templateController.getFrontTemplates);
router.get('/getWithId', templateController.getTemplateWithId)
router.post('/save', templateController.saveTemplate);

module.exports = router;