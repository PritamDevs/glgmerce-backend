const mongoose =require('mongoose')
let Product = require("../models/product.model")
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports.createProduct = async(req,res)=>{
    try {
        let{name,price,description,category,brand,size}=req.body;
        if(!name||!price||!description||!category||!brand||!size){
            return res.status(400).json({message:"Please fill all the fields",success:false});
        }else{
            let newProduct = await Product.create({
                name:name,
                price:price,
                description:description,
                category:category,
                brand:brand,
                size:size,
                sellerId: req.user._id 
            });
            return res.status(201).json({message:"Product created successfully",success:true,product:newProduct});
        }
    } catch (error) {
        console.error("Error in createProduct:", error.message);
        return res.status(500).json({message:"Internal Server Error",success:false});
    }

}
module.exports.AllProduct = async(req,res)=>{
    try {
        let products=await Product.find()
        return res.status(200).json({message:"All products",success:true,products:products});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",success:false});
    }

}
module.exports.DeleteProduct = async(req,res)=>{
    try {
        let _id = req.params.id;
        let product = await Product.findById(_id);
        if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
    }

        if (product.sellerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You can only delete your own products", success: false });
    }
        await Product.findByIdAndDelete(_id);

        return res.status(200).json({message:"Product deleted successfully",success:true});
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }

}