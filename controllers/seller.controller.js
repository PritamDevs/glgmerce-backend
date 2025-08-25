
const mongoose =require('mongoose')
const Seller = require("../models/seller.model")
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports.login=async(req,res)=> {
   try{
    let{email,password}=req.body
    if(!email||!password){
        return res.status(400).json({message:"Email and password are required",success:false})
    }else{
        let seller = await Seller.findOne({email:email})
        if(!seller){
            return res.status(400).json({message:"Invalid email",success:false})
        }else{
            let isValidPassword =await bycrypt.compare(password,seller.password)
            if(!isValidPassword){
                return res.status(400).json({message:"Invalid Password",success:false})
            }else{
                delete seller._doc.password

                let payload = {
                    name:seller.name,
                    email:seller.email,
                    phone:seller.phone,
                    id:seller._id,
                    type:"seller"
                }
                let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'})
                return res.status(200).json({message:"Login successful",success:true,token:token,seller:seller})
            }
        }
    }

   }catch(err){
      return res.status(500).json({message:"Internal Server Error",success:false});
   }
}

module.exports.Register=async(req,res)=> {
    try{
        let{name,email,password,cpassword,phone,address}=req.body;
        if(!name|| !email || !password || !cpassword || !phone || !address){
        return res.status(400).json({message:"Please fill all fields",success:false});
        }else if (password !== cpassword){
            return res.status(400).json({
                message:"Password and Confirm password are not same",success:false
            });
        }else {
            let seller = await Seller.find({$or: [{ email: email }, { phone: phone }]});
            if(seller.length > 0){
                return res.status(400).json({message:"Email or phone already exist",success:false});
            }else{
                let hasshedPassword = await bycrypt.hash(password,10)
                if(phone.length!==10){
                    return res.status(400).json({message:"Invalid Phone Number",success:false});
                }
                let newSeller = await Seller.create({
                    name:name,
                    email:email,
                    password:hasshedPassword,
                    phone:phone,
                    address:address
                })
                delete newSeller._doc.password
                return res.status(201).json({message:"Seller Registration Successfully",success:true,newSeller});
            }
        }
    }catch (err){
        return res.status(500).json({message:"Internal Server Error",success:false});
    }
    }

    module.exports.Profile=async (req,res)=>{
          try {
                    let data=await Seller.findById(bId)
                    delete data._doc.password
                    return res.send({message:"Seller profile",success:true,data})
                } catch (error) {
                     return res.status(500).json({message:"Internal Server Error",success:false});
                }
      
    }


   
