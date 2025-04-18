import MedicalRecord from "../models/medicalRecord.js";
import Appointment from "../models/appointmentModel.js";
import Prescription from "../models/prescriptionModel.js";

// Create or get medical record for a patient
export const getOrCreateMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    let medicalRecord = await MedicalRecord.findOne({ patient: patientId })
      .populate('patient')
      .populate('doctor')
      .populate('appointments')
      .populate('prescriptions')
      .populate('timeline.relatedAppointment')
      .populate('timeline.relatedPrescription');

    if (!medicalRecord) {
      medicalRecord = new MedicalRecord({ patient: patientId });
      await medicalRecord.save();
    }

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update medical record (basic info)
export const updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const medicalRecord = await MedicalRecord.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate('patient')
      .populate('doctor')
      .populate('appointments')
      .populate('prescriptions');

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add vitals to medical record
export const addVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const { vitals } = req.body;

    const medicalRecord = await MedicalRecord.findById(id);
    
    // Update current vitals
    if (vitals.heartRate) {
      medicalRecord.vitals.heartRate.current = vitals.heartRate.current;
      medicalRecord.vitals.heartRate.history.push({
        value: vitals.heartRate.current,
        min: vitals.heartRate.min || vitals.heartRate.current,
        max: vitals.heartRate.max || vitals.heartRate.current,
      });
    }

    if (vitals.bloodPressure) {
      medicalRecord.vitals.bloodPressure.current = vitals.bloodPressure.current;
      medicalRecord.vitals.bloodPressure.history.push({
        systolic: vitals.bloodPressure.current.systolic,
        diastolic: vitals.bloodPressure.current.diastolic,
      });
    }

    await medicalRecord.save();

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add timeline event
export const addTimelineEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { event } = req.body;

    const medicalRecord = await MedicalRecord.findByIdAndUpdate(
      id,
      { $push: { timeline: event } },
      { new: true }
    ).populate('timeline.relatedAppointment timeline.relatedPrescription');

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Link appointment to medical record
export const linkAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentId } = req.body;

    // Verify appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const medicalRecord = await MedicalRecord.findByIdAndUpdate(
      id,
      { $addToSet: { appointments: appointmentId } },
      { new: true }
    ).populate('appointments');

    // Add to timeline
    await MedicalRecord.findByIdAndUpdate(
      id,
      {
        $push: {
          timeline: {
            type: "appointment",
            date: appointment.date,
            title: `Appointment with Dr. ${appointment.doctor.name}`,
            details: appointment.purpose,
            relatedAppointment: appointmentId,
            doctor: appointment.doctor
          }
        }
      }
    );

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Link prescription to medical record
export const linkPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { prescriptionId } = req.body;

    // Verify prescription exists
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    const medicalRecord = await MedicalRecord.findByIdAndUpdate(
      id,
      { $addToSet: { prescriptions: prescriptionId } },
      { new: true }
    ).populate('prescriptions');

    // Add to timeline
    await MedicalRecord.findByIdAndUpdate(
      id,
      {
        $push: {
          timeline: {
            type: "prescription",
            date: prescription.createdAt,
            title: "New Prescription",
            details: `Prescribed by Dr. ${prescription.doctor.name}`,
            relatedPrescription: prescriptionId,
            doctor: prescription.doctor
          }
        }
      }
    );

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get complete medical history
export const getCompleteHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const medicalRecord = await MedicalRecord.findOne({ patient: patientId })
      .populate({
        path: 'appointments',
        populate: { path: 'doctor' }
      })
      .populate({
        path: 'prescriptions',
        populate: { path: 'doctor' }
      })
      .populate({
        path: 'timeline',
        populate: [
          { path: 'relatedAppointment', populate: { path: 'doctor' } },
          { path: 'relatedPrescription', populate: { path: 'doctor' } },
          { path: 'doctor' }
        ]
      });

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};