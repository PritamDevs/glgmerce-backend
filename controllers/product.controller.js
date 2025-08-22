let Product = require("../models/product.model")

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
                size:size
            });
            return res.status(201).json({message:"Product created successfully",success:true,product:newProduct});
        }
    } catch (error) {
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
        let id = req.params.id;
        let product = await Product.findByIdAndDelete(id);
        return res.status(200).json({message:"Product deleted successfully",success:true});
        
    } catch (error) {
        
    }

}