const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getalluser);
router.get('/connected', auth, userController.getuser);

module.exports = router;