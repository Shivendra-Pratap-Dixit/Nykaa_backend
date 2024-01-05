const auth = require("../Middleware/auth")
const { productModel } = require("../Model/product")
const admin=require("../Middleware/admin")
const productRoute=require("express").Router()



//get product

productRoute.get("/products",admin,async(req,res)=>{
try {
    const products=await productModel.find();
return res.status(200).send(products)
} catch (error) {
    return res.status(400).send({message:error.message}) 
}
})

productRoute.get("/products/:id",admin,async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await productModel.find({_id:id});

        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }

});


productRoute.post("/proucts",admin,async(req,res)=>{
    
    try {
        const product =new productModel(req.body);
        await product.save()
        return res.status(201).send({message:"New Product has been added in store","product":product})
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});

productRoute.patch("/products/:id",admin,async(req,res)=>{
    const {id} = req.params;

    try {
        await productModel.findByIdAndUpdate({_id:id},req.body)
        return res.status(204).send({message:"product has been updated"})
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});


productRoute.delete("/products/:id",admin,async(req,res)=>{
    const {id} = req.params;

    try {
        await productModel.findByIdAndDelete({_id:id})
        return res.status(202).send({message:"product has been deleted"})
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});
module.exports=productRoute;