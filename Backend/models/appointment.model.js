const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    expertID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slot: {
        type: String,
        enum: {
            values: ["9-10", "10-11", "11-12", "12-1", "1-2", "2-3", "3-4", "4-5"],
            message: "enter correct slot"
        },
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "confirm", "cancel"],
            message: ["incorrect status"]
        },
        default: "pending"
    },
    userDetails:{
        type: Schema.Types.Mixed , 
        required:true
    },
    expertDetails: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    versionKey: false
})

const AppointmentModel = mongoose.model("appointment",appointmentSchema);

module.exports = {AppointmentModel};