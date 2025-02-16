import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import specializationModel from '../models/specializationModel.js';
import cloudinary from '../config/cloudinary.js'

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel
            .find()
            .populate("specialization", "specialization") // Get specialization name
            .populate("user", "name email role image bgimage"); // Get user details

        res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            doctors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching doctors",
            error: error.message,
        });
    }
};



export const addDoctors = async (req, res) => {
    try {
        const { user, specialization, licenceNo, rating, about, experience, totalPatients, hourlyPrice } = req.body;
        // Check if a doctor already exists for the given user ID
        let doctor = await doctorModel.findOne({ user });

        if (doctor) {
            // Update existing doctor details
            doctor.specialization = specialization;
            doctor.licenceNo = licenceNo;
            doctor.rating = rating;
            doctor.about = about;
            doctor.experience = experience;
            doctor.totalPatients = totalPatients;
            doctor.hourlyPrice = hourlyPrice;

            await doctor.save();

            return res.status(200).send({
                success: true,
                message: "Doctor details updated",
                doctor
            });
        } else {
            // Create a new doctor entry
            doctor = await new doctorModel({
                user,
                specialization,
                licenceNo,
                rating,
                about,
                experience,
                totalPatients,
                hourlyPrice
            }).save();

            return res.status(201).send({
                success: true,
                message: "Doctor details added",
                doctor
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Doctor details failed to add or update",
            error: error.message
        });
    }
};



export const addSpecialization = async(req,res) =>{
    try {
        const {specialization} = req.body;
         const doctor = await new specializationModel({
                specialization
            }).save();
        
        res.status(200).send({
            success: true,
            message: "Specialization added",
            doctor
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Specialization failed to add",
            
        })
    }
}



export const changeSpecialization = async (req, res) => {
    try {
        const { id, specialization } = req.body;

        if (!id || !specialization) {
            return res.status(400).send({
                success: false,
                message: "Doctor ID and specialization are required",
            });
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            id,
            { specialization },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Doctor specialization updated successfully",
            data: updatedDoctor,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to update specialization",
            error: error.message,
        });
    }
};