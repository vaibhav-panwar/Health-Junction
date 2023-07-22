const { Router } = require("express");
const { ExpertModel } = require("../models/expert.model");
const { client } = require("../db/redis");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const expertRouter = Router();
expertRouter.get("/", async (req, res) => {
    try {
        let data = await ExpertModel.find();
        let arr = data.map((el) => {
            return {
                id: el._id,
                name: el.name,
                age: el.age,
                gender: el.gender,
                email: el.email,
                image: el.image,
                specialisation: el.specialisation
            }
        })
        res.status(200).send({
            isError: false,
            message: "request successfull",
            data: arr
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error.message
        })
    }
})
expertRouter.get("/:specialisation", async (req, res) => {
    let { specialisation } = req.params;
    try {
        let data = await ExpertModel.find({ specialisation });
        let arr = data.map((el) => {
            return {
                id: el._id,
                name: el.name,
                age: el.age,
                gender: el.gender,
                email: el.email,
                image: el.image,
                specialisation: el.specialisation
            }
        })
        res.status(200).send({
            isError: false,
            message: "request successfull",
            data: arr
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error.message
        })
    }
})

expertRouter.post("/register", async (req, res) => {
    const { name, image, age, gender, email, password, specialisation } = req.body;
    try {
        const user = await ExpertModel.findOne({ email });
        if (!user) {
            bcrypt.hash(password, Number(process.env.salt), async (err, hash) => {
                if (err) {
                    return res.status(400).send({
                        isError: true,
                        error: err
                    })
                }
                const new_user = new ExpertModel({ name, image, age, gender, email, password: hash, specialisation });
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

expertRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await ExpertModel.findOne({ email });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ expertID: user._id, email: user.email }, process.env.token, { expiresIn: "24h" })
                return res.status(200).send({
                    isError: false,
                    message: "expert logged in successfully",
                    token
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

expertRouter.post("/logout", async (req, res) => {
    const { email } = req.body;
    let str = req.headers.authorization;
    str = str.split(" ");
    let token = str[1];
    if (token) {
        try {
            await client.set(`${email}expertblacktoken`, token);
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
    else {
        return res.status(400).send({
            isError: true,
            error: "not valid request"
        });
    }
})

module.exports = {expertRouter}