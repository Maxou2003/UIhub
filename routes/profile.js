const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, profileController.getProfile);
router.get('/banner', auth, profileController.getBanner);
router.get('/image', auth, profileController.getImage);
router.get('/banner/:user', profileController.getOtherBanner);
router.get('/image/:user', profileController.getOtherImage);
router.get('/:user', profileController.getOtherProfile);
router.put('/', auth, multer, profileController.putProfile);

module.exports = router;