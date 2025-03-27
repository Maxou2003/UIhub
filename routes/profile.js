const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileConstroller');
const auth = require('../middleware/auth');

router.get('/', auth, profileController.getProfile);
router.get('/banner', auth, profileController.getBanner);
router.get('/image', auth, profileController.getBanner);

module.exports = router;