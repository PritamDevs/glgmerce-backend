const express=require('express');
const { Register, login } = require('../controllers/seller.controller');
const router=express.Router()

router.post('/login',login)
router.post('/register',Register)


module.exports= router