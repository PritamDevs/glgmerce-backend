let express = require('express')
let dotenv=require('dotenv')
let app=express()
const connectDB = require('./config/db.config')
dotenv.config()

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let buyerRoute = require('../Backend/routes/buyer.route')
app.use('/api/buyer',buyerRoute)
let sellerRoute = require('../Backend/routes/seller.route')
app.use('/api/seller',sellerRoute)
let productRoute = require('../Backend/routes/product.route')
app.use('/api/product',productRoute)

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})