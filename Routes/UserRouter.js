const express=require("express");
const { UserModel } = require("../Model/UserModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const UserRouter=express.Router();

UserRouter.post("/register",async(req,res)=>{
    try {
       const {name,email,password,gender}=req.body;
       bcrypt.hash(password, 3, async function(err, hash) {
       
        const user=new UserModel({
            name:name,
            email:email,
            gender:gender,
            password:hash
        });
        await user.save();
        res.send({"msg":"new user added"});
    });
    } catch (error) {
        res.send({"msg":error.message});
    }
});

UserRouter.get("/",async(req,res)=>{
    try {
        const users=await UserModel.find({});
        res.send(users);
        
  
    } catch (error) {
        res.send({"msg":error.message});
    }
});


UserRouter.post("/login",async(req,res)=>{
    try {
        const {name,email,password,gender}=req.body;
        
        const user = await UserModel.findOne({email:email});
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result)
            {

                var token = jwt.sign({ userid:user._id }, 'Rohan');
                res.send({"msg":"login scuccesssfull","token":token,"user":user});
            }
        });
        
  
    } catch (error) {
        res.send({"msg":error.message});
    }
});

module.exports={UserRouter};