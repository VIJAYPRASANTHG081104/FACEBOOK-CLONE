const express = require('express');
const { register,login,activateAccount,sendVerification } = require('../controllers/user');
const { authUser } = require('../middlewares/auth');

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/activate',authUser,activateAccount)
router.post('/sendverification',authUser,sendVerification)


module.exports = router;