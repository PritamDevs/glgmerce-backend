
const mongoose =require('mongoose')
const Seller = require("../models/seller.model")
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports.login=async(req,res)=> {
   try{
    let{email,password}=req.body
    if(!email||!password){
        return res.status(400).json({message:"Email and password are required"})
    }else{
        let seller = await Seller.findOne({email:email})
        if(!seller){
            return res.status(400).json({message:"Invalid email"})
        }else{
            let isValidPassword =await bycrypt.compare(password,seller.password)
            if(!isValidPassword){
                return res.status(400).json({message:"Invalid Password"})
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
                return res.status(200).json({message:"Login successful",success:true,token:token})
            }
        }
    }

   }catch(err){
      return res.status(500).json({message:"Internal Server Error",status:false});
   }
}

module.exports.Register=async(req,res)=> {
    try{
        let{name,email,password,cpassword,phone,address}=req.body;
        if(!name|| !email || !password || !cpassword || !phone || !address){
        return res.status(400).json({message:"Please fill all fields",status:false});
        }else if (password !== cpassword){
            return res.status(400).json({
                message:"Password and Confirm password are not same",status:false
            });
        }else {
            let seller = await Seller.find({$or: [{ email: email }, { phone: phone }]});
            if(seller.length > 0){
                return res.status(400).json({message:"Email or phone already exist",status:false});
            }else{
                let hasshedPassword = await bycrypt.hash(password,10)
                if(phone.length!==10){
                    return res.status(400).json({message:"Invalid Phone Number",status:false});
                }
                let newSeller = await Seller.create({
                    name:name,
                    email:email,
                    password:hasshedPassword,
                    phone:phone,
                    address:address
                })
                delete newSeller._doc.password
                return res.status(201).json({message:"Seller Registration Successfully",status:true,newSeller});
            }
        }
    }catch (err){
        return res.status(500).json({message:"Internal Server Error",status:false});
    }
    }

   
