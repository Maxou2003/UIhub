const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/', auth, profileController.getProfile);
router.get('/banner', auth, profileController.getBanner);
router.get('/image', auth, profileController.getImage);
router.put('/banner', auth, profileController.putBanner);
router.put('/image', auth, profileController.putImage);

module.exports = router;