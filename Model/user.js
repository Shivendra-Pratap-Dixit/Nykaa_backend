const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const Joi = require("joi");
const passwordcomplexity=require("joi-password-complexity")
require("dotenv").config()
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,maxlength:50},
    avatar:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
is_Admin:{type:Boolean,default:false},
created_at: { type: Date, default: Date.now },
updated_at: { type: Date, default: Date.now },
},{
    versionKey:false
})

// userSchema.methods.genrateAuthToken=function(){
//     const token=jwt.sign(
//         {_id:this._id,name:this.name,is_Admin:this.is_Admin},process.env.Secretkey,{expiresIn:"1d"}
//     )
//     return token;
// }
const validate=(user)=>{
    const schema=Joi.object({
        name:Joi.string().min(5).max(10).required(),
        avatar:Joi.string().required(),
        email:Joi.string().email().required(),
        password:passwordcomplexity().required(),
    })
    return schema.validate(user)
}
const userModel=mongoose.model("User",userSchema)
module.exports={
    userModel,validate
}