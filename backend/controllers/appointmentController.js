import appointmentModel from "../models/appointmentModel.js"
import Doctor from '../models/doctorModel.js'
import nodemailer from 'nodemailer';
import User from '../models/userModel.js'


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'mediaidapp@gmail.com',
    pass: 'ijro tsfg jxwh ujef',
  },
});


const createAppointmentEmail = (recipientName, appointmentDetails, isDoctor) => {
  const role = isDoctor ? 'a patient' : 'your doctor';
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Appointment Confirmation</h2>
      <p>Dear ${recipientName},</p>
      <p>Your appointment with ${role} has been successfully booked:</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Date:</strong> ${new Date(appointmentDetails.date).toDateString()}</p>
        <p><strong>Time:</strong> ${appointmentDetails.time}</p>
        <p><strong>Purpose:</strong> ${appointmentDetails.purpose || 'Not specified'}</p>
        ${isDoctor ? `<p><strong>Patient:</strong> ${appointmentDetails.patientName}</p>` : ''}
      </div>
      
      <p style="margin-top: 30px;">Best regards,<br>Healthcare Team</p>
    </div>
  `;
};

export const createappointment = async (req, res) => {
  try {
    const { user, doctor, date, purpose, time } = req.body;

    const newappointment = await new appointmentModel({
      user,
      doctor,
      date,
      purpose,
      time
    }).save();

    const [doctorData, patientData] = await Promise.all([
      Doctor.findById(doctor).select('email name'),
      User.findById(user).select('email name')
    ]);

    if (!doctorData || !patientData) {
      return res.status(404).send({
        success: false,
        message: "Doctor or patient not found",
      });
    }

    const appointmentDetails = {
      date,
      time,
      purpose,
      patientName: patientData.name,
      doctorName: doctorData.name
    };

    const sendEmailPromises = [
      transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: doctorData.email,
        subject: `New Appointment - ${patientData.name}`,
        html: createAppointmentEmail(doctorData.name, appointmentDetails, true)
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: patientData.email,
        subject: `Appointment Confirmation - Dr. ${doctorData.name}`,
        html: createAppointmentEmail(patientData.name, appointmentDetails, false)
      })
    ];

    Promise.all(sendEmailPromises)
      .then(results => {
        console.log('Emails sent successfully:', results.map(r => r.response));
      })
      .catch(error => {
        console.error('Error sending emails:', error);
      });

    res.status(201).send({
      success: true,
      message: "Appointment created successfully",
      appointment: newappointment
    });

  } catch (error) {
    console.error('Error in createappointment:', error);
    res.status(500).send({
      success: false,
      message: "Error occurred while creating appointment",
      error: error.message
    });
  }
};



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

    // Find all appointments for the given doctor ID
    const appointments = await appointmentModel
      .find({ doctor: id }) 
      .populate('user', 'name email image')
      .populate('doctor', 'name email image specialization hospital')
      .sort({ createdAt: -1 }); 

    if (!appointments || appointments.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No appointments found for this doctor",
      });
    }

    res.status(200).send({
      success: true,
      message: "Appointments fetched successfully",
      count: appointments.length, // Add count of appointments
      appointments, // Return the array of appointments
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occurred while fetching appointments",
      error: error.message,
    });
  }
  };




  export const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate the status value
        const validStatuses = ["Pending", "Approved", "Cancelled", "Completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).send({
                success: false,
                message: "Invalid status value. Must be one of: Pending, Approved, Cancelled, Completed"
            });
        }

        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        ).populate('user', 'name email')
         .populate('doctor', 'name email');

        if (!updatedAppointment) {
            return res.status(404).send({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Appointment status updated successfully",
            appointment: updatedAppointment
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurred while updating appointment status",
            error: error.message
        });
    }
};



export const getappointmentbyHospital = async (req, res) => {
  try {
    const { id } = req.params; // This is the hospital ID

    // Find all appointments where the doctor's hospital matches the given ID
    const appointments = await appointmentModel
      .find()
      .populate({
        path: 'doctor',
        match: { hospital: id }, 
        select: 'name email image specialization hospital'
      })
      .populate('user', 'name email image')
      .sort({ createdAt: -1 });

    const filteredAppointments = appointments.filter(appt => appt.doctor !== null);

    if (!filteredAppointments || filteredAppointments.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No appointments found for this hospital",
      });
    }

    res.status(200).send({
      success: true,
      message: "Appointments fetched successfully by hospital",
      count: filteredAppointments.length,
      appointments: filteredAppointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error occurred while fetching appointments by hospital",
      error: error.message,
    });
  }
};

export const handleAppointmentNotes = async (req, res) => {
  try {
    const { id } = req.params; 
    const { notes } = req.body; 
    const doctorId = req.user._id; 

    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.doctor.toString() !== doctorId.toString()) {
      return res.status(403).json({ error: "Unauthorized: Not your appointment" });
    }

    appointment.notes = notes;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Notes updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime, slotId, day } = req.body;

    // Validate input
    if (!newDate || !newTime || !slotId || !day) {
      return res.status(400).send({
        success: false,
        message: "All fields are required for rescheduling",
      });
    }

    // Check if new date is valid
    const appointmentDate = new Date(newDate);
    if (appointmentDate < new Date()) {
      return res.status(400).send({
        success: false,
        message: "Cannot reschedule to a past date",
      });
    }

    // Find the existing appointment
    const existingAppointment = await appointmentModel.findById(id)
      .populate('user', 'name email')
      .populate('doctor', 'name email');

    if (!existingAppointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    // Get doctor's current schedule
    const doctor = await Doctor.findById(existingAppointment.doctor._id);
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Verify slot availability
    const targetSlot = doctor.freeslots.find(slot => 
      slot._id.toString() === slotId && 
      slot.day.toLowerCase() === day.toLowerCase() &&
      slot.time === newTime &&
      slot.status === 'available'
    );

    if (!targetSlot) {
      return res.status(400).send({
        success: false,
        message: "Selected slot is not available",
      });
    }

    // Free up previously booked slot if exists
    if (existingAppointment.slotId) {
      await Doctor.findByIdAndUpdate(
        existingAppointment.doctor._id,
        { $set: { "freeslots.$[elem].status": "available" } },
        { 
          arrayFilters: [{ "elem._id": existingAppointment.slotId }],
          new: true 
        }
      );
    }

    // Book the new slot
    await Doctor.findByIdAndUpdate(
      existingAppointment.doctor._id,
      { $set: { "freeslots.$[elem].status": "booked" } },
      { 
        arrayFilters: [{ "elem._id": slotId }],
        new: true 
      }
    );

    // Update appointment
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      id,
      {
        date: newDate,
        time: newTime,
        slotId: slotId,
        status: "Rescheduled",
        previousDate: existingAppointment.date,
        previousTime: existingAppointment.time,
      },
      { new: true }
    ).populate('user', 'name email').populate('doctor', 'name email');

    // Send notification emails
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: [updatedAppointment.user.email, updatedAppointment.doctor.email],
      subject: `Appointment Rescheduled - ${updatedAppointment.doctor.name}`,
      html: `
        <div>
          <h2>Appointment Rescheduled</h2>
          <p>Previous: ${new Date(existingAppointment.date).toDateString()} at ${existingAppointment.time}</p>
          <p>New: ${new Date(newDate).toDateString()} at ${newTime}</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Email error:', error);
      else console.log('Email sent:', info.response);
    });

    res.status(200).send({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Reschedule error:', error);
    res.status(500).send({
      success: false,
      message: "Error rescheduling appointment",
      error: error.message
    });
  }
};