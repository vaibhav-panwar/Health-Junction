const { Router } = require("express");
const { AppointmentModel } = require("../models/appointment.model");
const { ExpertModel } = require("../models/expert.model");
const { UserModel } = require("../models/user.models");
const { userAuth, expertAuth } = require("../middlewares/auth.middleware");
require("dotenv").config();

const appointmentRouter = Router();

appointmentRouter.post("/create", userAuth, async (req, res) => {
    let { userID, expertID, date, slot } = req.body;
    let a = await AppointmentModel.findOne({ expertID, date, slot });
    if (!a) {
        try {
            let userDetails = await UserModel.findOne({_id:userID});
            let expertDetails = await ExpertModel.findOne({_id:expertID});
            let data = new AppointmentModel({ userID, expertID, date, slot , userDetails , expertDetails});
            await data.save()
            return res.status(200).send({
                isError: false,
                message: "appointment created successfully",
                data
            })
        } catch (error) {
            return res.status(400).send({
                isError: true,
                error: error.message
            })
        }
    }
    else {
        return res.status(400).send({
            isError: true,
            error: "this slot is already booked"
        })
    }
})

appointmentRouter.get("/user", userAuth, async (req, res) => {
    let { userID } = req.body;
    try {
        let data = await AppointmentModel.find({ userID })
        return res.status(200).send({
            isError: false,
            message: "request successfull",
            data
        })
    } catch (error) {
        return res.status(400).send({
            isError: true,
            error: error.message
        })
    }
})

appointmentRouter.get("/expert", expertAuth, async (req, res) => {
    let { expertID } = req.body;
    try {
        let data = await AppointmentModel.find({ expertID });
        return res.status(200).send({
            isError: false,
            message: "request successfull",
            data
        })
    } catch (error) {
        return res.status(400).send({
            isError: true,
            error: error.message
        })
    }
})

appointmentRouter.patch("/expert/:appointmentID", expertAuth, async (req, res) => {
    let id = req.params.appointmentID;
    try {
        await AppointmentModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({
            isError: false,
            message: "appointment updated successfully"
        })
    } catch (error) {
        return res.status(400).send({
            isError: true,
            error: error.message
        })
    }
})

appointmentRouter.patch("/user/:appointmentID", userAuth, async (req, res) => {
    let id = req.params.appointmentID;
    try {
        await AppointmentModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({
            isError: false,
            message: "appointment updated successfully"
        })
    } catch (error) {
        return res.status(400).send({
            isError: true,
            error: error.message
        })
    }
})

module.exports = { appointmentRouter };