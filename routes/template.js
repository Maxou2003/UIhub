const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/getFront', templateController.getFrontTemplates);
router.post('/save', templateController.saveTemplate);

module.exports = router;