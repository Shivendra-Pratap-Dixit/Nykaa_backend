const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { userModel, validate } = require("../Model/user");

const userRoute=express.Router();



//for register the user
userRoute.post("/register",async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});
    const user=await userModel.findOne({email:req.body.email});
    if(user) return res.status(403).send({message:"User with this Email is Already Exists"});
    const salt=await bcrypt.genSalt(5);
    const hashPassword=await bcrypt.hash(req.body.password,salt);
    let newUser=await new userModel({
        ...req.body,
        password:hashPassword
    }).save();
    newUser.password=undefined;
    newUser._v=undefined;
    res.status(201).send({data:newUser,message:"Your Nykaa Account Created Successfully"})
});


//for login
userRoute.post("/login",async(req,res)=>{
    const user=await userModel.findOne({email:req.body.email});
    if(!user) return res.status(400).send({message:"Invalid Email or Password"})
    const validpassword=await bcrypt.compare(req.body.password,user.password);
    if(!validpassword) return res.status(400).send({message:"Invalid Email or Password"});
    const token=jwt.sign(
        {_id:user._id,name:user.name,is_Admin:user.is_Admin},process.env.Secretkey,{expiresIn:"1d"}
    )
    res.status(201).send({token:token,userId:user._id,name:user.name,avatar:user.avatar,message:"Signing In Please wait... "});
})


module.exports=userRoute