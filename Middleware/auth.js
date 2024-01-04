const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
if(!token)
return res.status(400).send({message:"Access Denied ,No token "})
jwt.verify(token,process.env.Secretkey,(error,validToken)=>{
    if(error){
        return res.status(400).send({message:"Invalid token Please Login Again"})
    }else{
        req.user=validToken
        next()
    }
})
}
module.exports=auth