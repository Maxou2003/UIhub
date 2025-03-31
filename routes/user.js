const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logged', auth, userController.getloggeduser);
router.get('/', userController.getalluser);
router.get('/:id', auth, userController.getuserbyid);



module.exports = router;