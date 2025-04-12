import appointmentModel from "../models/appointmentModel.js"


export const createappointment = async(req,res) =>{
    try {
        const {user,doctor,date, purpose, time} = req.body;

        const newappointment = new appointmentModel({
            user,
            doctor,
            date,
            purpose,
            time
        }).save();

        res.status(201).send({
            success: true,
            message: "Appointment created successfully",
            appointment: newappointment
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured while creating appointment",
            error: error.message
        })
    }
}



export const getallappointment = async(req,res) =>{
    try {
        const appointments = await appointmentModel.find();

        res.status(200).send({
            success: true,
            message: "Appointments fetched successfully",
            appointments: appointments
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured fetching",
            error: error.message
        })
    }
}


export const getsingleappointment = async(req,res) =>{
    try {
        const {id} = req.params;

        const appointment = await appointmentModel.findById(id);
        res.status(200).send({
            success: true,
            message: "Appointment fetched successfully",
            appointment: appointment    
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured fetching",
            error: error.message
        })
    }
}





export const getappointmentbydocidcontroller = async(req,res) =>{
    try {
        const {id} = req.params;

        const appointments = await appointmentModel.find({doctor: id}).populate('user', 'name email image').populate('doctor', 'name email image specialization hospital').sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "Appointments fetched successfully",
            appointments: appointments    
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured fetching",
            error: error.message
        })
    }
}



export const deleteappointmentcontroller = async(req,res) =>{
    try {
        const {id} = req.params;
        const appointment = await appointmentModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Appointment deleted successfully",
            appointment: appointment    
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured deleting",
            error: error.message
        })
    }
}