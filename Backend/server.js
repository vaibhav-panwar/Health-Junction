const express = require("express");
const {connect} = require("./db/mongodb");
require('dotenv').config();

const app = express();


app.listen(process.env.port,async()=>{
   await connect
   console.log(`server is running at port ${process.env.port}`);
})