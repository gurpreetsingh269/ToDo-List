const express=require('express');
const router=express.Router();
const Todo = require("../models/ToDo");

// ADD TODO
router.post("/",async(req,res)=>{
const {title,userId}=req.body;
const todo=new Todo({
    title,
    userId
})
await todo.save();
res.json(todo);
})

//GET TODO
router.get("/:userId",async(req,res)=>{
    const todos=await Todo.find({userId:req.params.userId});
    res.json(todos);
})
module.exports=router;