const express = require("express");
const { UserModel } = require("../models/user.models");
const { client } = require("../db/redis");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();




userRouter.post("/register", async (req, res) => {
    const { name, age, gender, email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            bcrypt.hash(password, Number(process.env.salt), async (err, hash) => {
                if (err) {
                    return res.status(400).send({
                        isError: true,
                        error: err
                    })
                }
                const new_user = new UserModel({ name, age, gender, email, password: hash });
                await new_user.save();
                return res.status(200).send({
                    isError: false,
                    message: "user registered successfully",
                    user: new_user
                })
            })
        } else {
            return res.status(400).send({
                isError: true,
                error: "user already exist"
            })
        }
    } catch (error) {
        return res.status(400).send({
            isError: true,
            error: error.message
        });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ userID: user._id,email:user.email }, process.env.token, { expiresIn: "24h" })
                return res.status(200).send({
                    isError: false,
                    message: "user logged in successfully",
                    token,
                    data:{
                        name:user.name,
                        email:user.email
                    }
                })
            }
        } else {
            return res.status(400).send({
                isError: true,
                error: "this email doesn't exist please register first"
            });
        }
    } catch (error) {
        return res.status(400).send({
            isError: true,
            error: error.message
        });
    }
})

userRouter.post("/logout", async (req, res) => {
    const { email } = req.body;
    let str = req.headers.authorization;
    str = str.split(" ");
    let token = str[1];
    if(token){
        try {
            await client.set(`${email}blacktoken`, token);
            return res.status(200).send({
                isError: false,
                message: 'logout successfull'
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                isError: true,
                error: error.message
            });
        }
    }
    else{
        return res.status(400).send({
            isError: true,
            error: "not valid request"
        });
    }

})

module.exports = { userRouter };