const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const User=require("../model/userModel")
const router=express.Router()

router.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
try{
   bcrypt.hash(pass,5, async(err, hash)=> {
        const user=new User({name,email,pass:hash})
         await user.save()
         res.send({"msg":"registered successfull"})
    });
   }catch(err){
    res.send({"msg":"something went wrong","error":err.message})
}
})

router.post("/login",async(req,res)=>{
const {email,pass}=req.body
try{
    const user=await User.find({email})
    if(user.length>0){
        bcrypt.compare(pass, user[0].pass, async(err, result)=> {
            if(result){
                const token = jwt.sign({ userID: user[0]._id }, 'masai');
                res.send({"msg":"successfull",token:token})
            }else{
                res.send({msg:"Wrong credential","error":err})
            }
        });
    }else{
        res.send({msg:"Wrong credential"})
    }
}catch(err){
    res.send({"msg":"Something went wrong","error":err.message})
}
})

module.exports=router