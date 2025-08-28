const express=require('express');
const { Register, login,Profile } = require('../controllers/seller.controller');
const { auth } = require('../middleware/auth.middleware');
const router=express.Router()

router.post('/login',login)
router.post('/register',Register)
router.get('/profile',auth(['seller']),Profile)


module.exports= router