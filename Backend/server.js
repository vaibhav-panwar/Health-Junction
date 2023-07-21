const express = require("express");
require('dotenv').config();

const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());

const { connect } = require("./db/mongodb");
const { userRouter } = require("./routes/user.routes");
const { redisConnect } = require('./db/redis');
const { userAuth } = require("./middlewares/auth.middleware");

app.use("/users", userRouter);
app.get("/",userAuth,(req, res) => {
    res.status(200).send("Welcome to Healhub");
})



app.listen(process.env.port, async () => {
    await redisConnect
    await connect
    console.log(`server is running at port ${process.env.port}`);
})