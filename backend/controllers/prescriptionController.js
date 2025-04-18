import Prescription from '../models/prescriptionModel.js';
import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';

// Create a new prescription
export const createPrescription = async (req, res) => {
  try {
    const { user, appointment, doctor, prescription, medication } = req.body;

    // Validate required fields
    if (!user || !doctor || !prescription || !medication) {
      return res.status(400).json({ 
        success: false, 
        message: 'User, doctor, prescription, and medication are required' 
      });
    }

    // Check if user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Doctor not found' 
      });
    }

    // Check if appointment exists if provided
    if (appointment) {
      const appointmentExists = await Appointment.findById(appointment);
      if (!appointmentExists) {
        return res.status(404).json({ 
          success: false, 
          message: 'Appointment not found' 
        });
      }
    }

    // Create new prescription
    const newPrescription = new Prescription({
      user,
      appointment: appointment || null,
      doctor,
      prescription,
      medication
    });

    await newPrescription.save();

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: newPrescription
    });

  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('user', 'name email')
      .populate('doctor', 'name specialization')
      .populate('appointment', 'date time');

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Get prescriptions by user ID
export const getPrescriptionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const prescriptions = await Prescription.find({ user: userId })
      .populate('user', 'name email')
      .populate('doctor', 'name specialization')
      .populate('appointment', 'date time');

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });

  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Get prescriptions by doctor ID
export const getPrescriptionsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const prescriptions = await Prescription.find({ doctor: doctorId })
      .populate('user', 'name email')
      .populate('doctor', 'name specialization')
      .populate('appointment', 'date time');

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });

  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Get single prescription by ID
export const getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findById(id)
      .populate('user', 'name email phone')
      .populate('doctor', 'name specialization')
      .populate('appointment', 'date time purpose');

    if (!prescription) {
      return res.status(404).json({ 
        success: false, 
        message: 'Prescription not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: prescription
    });

  } catch (error) {
    console.error('Error fetching prescription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Update a prescription
export const updatePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { prescription, medication } = req.body;

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      { prescription, medication },
      { new: true, runValidators: true }
    )
    .populate('user', 'name email')
    .populate('doctor', 'name specialization')
    .populate('appointment', 'date time');

    if (!updatedPrescription) {
      return res.status(404).json({ 
        success: false, 
        message: 'Prescription not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Prescription updated successfully',
      data: updatedPrescription
    });

  } catch (error) {
    console.error('Error updating prescription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Delete a prescription
export const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findByIdAndDelete(id);

    if (!prescription) {
      return res.status(404).json({ 
        success: false, 
        message: 'Prescription not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Prescription deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting prescription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};