const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name field empty"]
    },
    age: {
        type: Number,
        required: [true, "age field empty"]
    },
    gender:{
        type:String,
        enum:{
            values:["male","female"],
            message:"incorrect gender"
        }
    },
    email: {
        type: String,
        required: [true, "email field empty"]
    },
    password: {
        type: String,
        required: [true, "password field empty"]
    },
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel};