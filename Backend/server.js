const express = require("express");
const { connect } = require("./db/mongodb");
require('dotenv').config();
const { userRouter } = require("./routes/user.routes");
const { auth } = require("./middlewares/auth.middleware");
const { redisConnect } = require('./db/redis');
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Healhub");
})

app.use("/users", userRouter);

app.listen(process.env.port, async () => {
    await redisConnect
    await connect
    console.log(`server is running at port ${process.env.port}`);
})