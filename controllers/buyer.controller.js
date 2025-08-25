const mongoose =require('mongoose')
const Buyer = require("../models/buyer.model")
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports.login=async(req,res)=> {
   try{
    let{email,password}=req.body
    if(!email||!password){
        return res.status(400).json({message:"Email and password are required",success:false})
    }else{
        let buyer = await Buyer.findOne({email:email})
        if(!buyer){
            return res.status(400).json({message:"Invalid email",success:false})
        }else{
            let isValidPassword =await bycrypt.compare(password,buyer.password)
            if(!isValidPassword){
                return res.status(400).json({message:"Invalid Password",success:false})
            }else{
                delete buyer._doc.password

                let payload = {
                    name:buyer.name,
                    email:buyer.email,
                    phone:buyer.phone,
                    id:buyer._id,
                    type:"buyer"
                }
                let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'})
                return res.status(200).json({message:"Login successful",success:true,token:token})
            }
        }
    }

   }catch(err){
      return res.status(500).json({message:"Internal Server Error",success:false});
   }
}

module.exports.Register=async(req,res)=> {
    try{
        let{name,email,password,cpassword,phone}=req.body;
        if(!name|| !email || !password || !cpassword || !phone){
        return res.status(400).json({message:"Please fill all fields",status:false});
        }else if (password !== cpassword){
            return res.status(400).json({
                message:"Password and Confirm password are not same",success:false
            });
        }else {
            let buyer = await Buyer.find({$or: [{ email: email }, { phone: phone }]});
            if(buyer.length > 0){
                return res.status(400).json({message:"Email or phone already exist",success:false});
            }else{
                let hasshedPassword = await bycrypt.hash(password,10)
                if(phone.length!==10){
                    return res.status(400).json({message:"Invalid Phone Number",success:false});
                }
                let newBuyer = await Buyer.create({
                    name:name,
                    email:email,
                    password:hasshedPassword,
                    phone:phone
                })
                delete newBuyer._doc.password
                return res.status(201).json({message:"Buyer Registration Successfully",success:true,newBuyer});
            }
        }
    }catch (err){
        return res.status(500).json({message:"Internal Server Error",success:false});
    }
    }


    module.exports.Profile=async (req,res)=>{
        const bId=req.user.id
        try {
            let data=await Buyer.findById(bId)
            delete data._doc.password
            return res.send({message:"buyer profile",success:true,data})
        } catch (error) {
             return res.status(500).json({message:"Internal Server Error",success:false});
        }
    }


// module.exports={
//     login,
//     Register
// }S



