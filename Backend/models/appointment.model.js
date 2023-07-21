const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    expertID: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    status:{
        type:String,
        enum:{
            values:["pending","confirm","cancel"],
            message:["incorrect status"]
        },
        default:"pending"
    }
})

const AppointmentModel = mongoose.model("appointment",appointmentSchema);

module.exports = {AppointmentModel};