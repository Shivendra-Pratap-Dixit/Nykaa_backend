const express=require("express");
// require("express-async-errors");
const cors=require("cors");
require("dotenv").config()
const { connection } = require("./db");
const userRoute = require("./Routes/user");
const productRoute = require("./Routes/product");
const app=express();

const PORT=process.env.PORT ||8080;
app.use(express.json())
app.use(cors());
app.use("/api",userRoute);
app.use("/api",productRoute)
app.get("/",(req,res)=>{
    res.status(200).send({message:"Welcome to Nykaa Backend by Shivendra for api/register and api/login {for Products => api/products(for post product) products/(for get product) api/products/:id(for single product) api/products/:id (for edit patch) api/products/:id(for delete the product) "})
})
app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`Server is running at ${PORT} and Connected to MongoDB`)
        
    } catch (error) {
        console.error(`${error}`)
    }
    
})