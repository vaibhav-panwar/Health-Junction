const express = require("express");
require('dotenv').config();

const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());

const { connect } = require("./db/mongodb");
const { userRouter } = require("./routes/user.routes");
const { redisConnect } = require('./db/redis');
const { expertRouter } = require("./routes/expert.routes");

app.use("/users", userRouter);
app.use("/experts",expertRouter);

app.get("/",(req, res) => {
    res.status(200).send({
        isError:false,
        message:"this is base point"
    });
})



app.listen(process.env.port, async () => {
    await redisConnect
    await connect
    console.log(`server is running at port ${process.env.port}`);
})