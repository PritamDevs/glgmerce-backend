const mongoose=require('mongoose');
const {Schema} = mongoose;

let productSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        enum:['Men','Women','Kids','Others'],
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
})
module.exports = mongoose.model('Product',productSchema);
