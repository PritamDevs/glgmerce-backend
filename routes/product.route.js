const express=require('express');
const { createProduct,AllProduct,DeleteProduct } = require('../controllers/product.controller');
const { auth } = require('../middleware/auth.middleware');
const router=express.Router()

router.post('/create',auth(['seller']),createProduct)
router.get('/all',auth(['seller','buyer']),AllProduct)
router.delete('/delete/:id',auth(['seller']),DeleteProduct)

module.exports= router