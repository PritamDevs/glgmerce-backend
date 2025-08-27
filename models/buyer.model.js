const mongoose=require('mongoose');
const {Schema} = mongoose;

let buyerSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    }
})
module.exports = mongoose.model('Buyer',buyerSchema);
