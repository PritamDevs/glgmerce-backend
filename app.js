let express = require('express')
let dotenv=require('dotenv')
let app=express()
const connectDB = require('./config/db.config')
dotenv.config()

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let buyerRoute = require('./routes/buyer.route')
app.use('./api/buyer',buyerRoute)
let sellerRoute = require('./routes/seller.route')
app.use('./api/seller',sellerRoute)
let productRoute = require('./routes/product.route')
app.use('./api/product',productRoute)

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})