const express=require('express');
const { login, Register,Profile } = require('../controllers/buyer.controller');
const { auth } = require('../middleware/auth.middleware');
const router=express.Router()

router.post('/login',login)
router.post('/register',Register)
router.get('/profile',auth(['buyer']),Profile)

module.exports= router