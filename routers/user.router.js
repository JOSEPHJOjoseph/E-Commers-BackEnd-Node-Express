const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');
const userValidator = require('../validators/user.validator');

router.post('/register', userValidator, userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/send-email', userCtrl.sendMail); // Make sure this is correctly defined in your controller
router.post('/update-password', userCtrl.updatedPassword);

module.exports = router;
