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



//fetching unique patients per doctor because one patients can have many appointments with a single doctor
export const getsingleappointmentbydoctor = async (req, res) => {
    try {
      const { id } = req.params;
  
      const appointments = await appointmentModel
        .find({ doctor: id })
        .populate('user', 'name email image')
        .populate('doctor', 'name email image specialization hospital')
        .sort({ createdAt: -1 });
  
      // Filter to keep only one appointment per user
      const uniqueAppointments = [];
      const seenUsers = new Set();
  
      for (let appt of appointments) {
        // Check if user exists before accessing _id
        if (appt.user && appt.user._id) {
          const userId = appt.user._id.toString();
          if (!seenUsers.has(userId)) {
            uniqueAppointments.push(appt);
            seenUsers.add(userId);
          }
        }
      }
  
      res.status(200).send({
        success: true,
        message: "Unique user appointments fetched successfully",
        appointments: uniqueAppointments,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error occurred fetching",
        error: error.message,
      });
    }
  };


  export const getappointmentbyuser = async(req,res) =>{
    try {
        const {id} = req.params;
        const appointments = await appointmentModel
        .find({ user: id })
        .populate({
          path: "doctor",
          select: "name email image specialization hospital",
          populate: {
            path: "hospital",
            select: "name",
          },
        })
        .populate("user", "name email")
        .sort({ createdAt: -1 });
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



export const getappapointmentbydoctor = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find a single appointment for the given doctor ID
      const appointment = await appointmentModel
        .findOne({ doctor: id }) 
        .populate('user', 'name email image')
        .populate('doctor', 'name email image specialization hospital')
        .sort({ createdAt: -1 }); // Still sorts, but returns only one
  
      if (!appointment) {
        return res.status(404).send({
          success: false,
          message: "No appointment found for this doctor",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Single appointment fetched successfully",
        appointment, // Return the single appointment
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error occurred while fetching appointment",
        error: error.message,
      });
    }
  };