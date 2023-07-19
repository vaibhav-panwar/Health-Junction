const express=require("express");
const {UserModel}=require("../models/users.model");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


userRouter.post("/register",async(req,res)=>{
    const {name,age,gender,email,password}=req.body;
    try {
        const user=await UserModel.find({name,age,gender,email});
        console.log(user);
        if(user.length==0){
            bcrypt.hash(password,5,async(err,hash)=>{
                const new_user=new UserModel({name,age,gender,email,password:hash});
                await new_user.save();
                res.status(200).send({"msg":"New user has been added."})
            })
        }else{
            res.status(400).send({"msg":"User already exists,please login"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                result? res.status(200).send({"msg":"login successful","token":jwt.sign({"userId":user[0]._id},"secretkey",{expiresIn:"1h"})}):
                    res.status(400).send({"msg":"Wrong credentials"});
            })
        }else{
            res.status(400).send({"msg":"Wrong credentials"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

module.exports={userRouter};