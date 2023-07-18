const express = require("express");
require('dotenv').config();

const app = express();


app.listen(process.env.port,()=>{
   console.log(`server is running at port ${process.env.port}`);
})