const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/', auth, profileController.getProfile);
router.get('/banner', auth, profileController.getBanner);
router.get('/image', auth, profileController.getImage);
router.put('/banner', auth, profileController.putBanner);
router.put('/image', auth, profileController.putImage);
router.get('/banner/:user', profileController.getOtherBanner);
router.get('/image/:user', profileController.getOtherImage);
router.get('/:user', profileController.getOtherProfile);

module.exports = router;