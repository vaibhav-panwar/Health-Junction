const jwt = require("jsonwebtoken");
require("dotenv").config();
const { client } = require("../db/redis");

const userAuth = async (req, res, next) => {
    let str = req.headers.authorization;
    str = str.split(" ");
    let token = str[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.token);
                let blacktoken = await client.get(`${decoded.email}blacktoken`);
                if (blacktoken === token) {
                    return res.status(400).send({
                        isError: true,
                        error: "you're logged out please login first"
                    })
                }
                req.body.user = decoded.userId;
                next();
        } catch (error) {
            return res.status(400).send({
                isError: true,
                error: "token not valid"
            })
        }
    } else {
        return res.status(400).send({
            isError: true,
            error: "please login first"
        })
    }
}

module.exports = { userAuth };