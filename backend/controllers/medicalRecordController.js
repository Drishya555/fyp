import MedicalRecord from "../models/medicalRecord.js";
export const createOrUpdateMedicalRecord = async (req, res) => {
  try {
    const { patientId, doctorId, vitals, timelineEvent } = req.body;
    
    // Validate required fields
    if (!patientId || !doctorId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Patient ID and Doctor ID are required' 
      });
    }

    // Check if medical record exists for this patient-doctor pair
    let medicalRecord = await MedicalRecord.findOne({ 
      patient: patientId, 
      doctor: doctorId 
    });

    if (!medicalRecord) {
      // Create new medical record if none exists
      medicalRecord = new MedicalRecord({
        patient: patientId,
        doctor: doctorId,
        vitals: vitals || null,
        timeline: timelineEvent ? [timelineEvent] : []
      });
    } else {
      // Update existing record
      if (vitals) {
        // Update vitals (overwrites previous vitals)
        medicalRecord.vitals = vitals;
      }
      
      if (timelineEvent) {
        // Add new timeline event to the beginning of the array
        medicalRecord.timeline.unshift(timelineEvent);
      }
    }

    // Save the record
    await medicalRecord.save();

    return res.status(200).json({
      success: true,
      message: 'Medical record updated successfully',
      data: medicalRecord
    });

  } catch (error) {
    console.error('Error updating medical record:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Additional controller to get medical records by patient and doctor
export const getMedicalRecord = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;

    const medicalRecord = await MedicalRecord.findOne({
      patient: patientId,
      doctor: doctorId
    }).populate('patient doctor');

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: medicalRecord
    });

  } catch (error) {
    console.error('Error fetching medical record:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};