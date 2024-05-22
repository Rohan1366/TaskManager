const express=require("express");
const { Todomodel } = require("../Model/TodoModel");

const TodoRouter=express.Router();

TodoRouter.post("/",async(req,res)=>{
    try {
      console.log(req.body,1);
        const post=new Todomodel(req.body);
        await post.save();
        
        res.send({"msg":"new todo added"});
    } catch (error) {
      res.send({"msg":error.message});  
    }
});

TodoRouter.get("/",async(req,res)=>{
    try {
      const {liable,user_id}=req.query;
      console.log(liable,user_id);
      console.log(req.body,1);
      console.log(req.headers.authorization);
      const Todos=await Todomodel.find();
      // console.log(Todos);
      const todo=Todos.filter((item)=>item.liable.includes(liable) || item.user_id==user_id);
      res.send(todo);
    } catch (error) {
      res.send({"msg":error.message});  
    }
});


TodoRouter.get("/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    console.log(id);
    let todo=await Todomodel.findOne({_id:id});
    res.send(todo);
  } catch (error) {
    res.send({"msg":error.message});  
  }
});

TodoRouter.patch("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
        await Todomodel.findByIdAndUpdate({_id:id},req.body);
        res.send({"msg":"post edited successfully"});
    } catch (error) {
      res.send({"msg":error.message});  
    }
});

TodoRouter.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
        await Todomodel.findByIdAndDelete({_id:id});
        res.send({"msg":"post deleted successfully"});
    } catch (error) {
      res.send({"msg":error.message});  
    }
});

module.exports={TodoRouter};