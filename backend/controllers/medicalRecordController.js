import MedicalRecord from "../models/medicalRecord.js";

export const createOrUpdateMedicalRecord = async (req, res) => {
  try {
    const { patientId, doctorId, vitals, timelineEvent, allergies } = req.body;
    
    if (!patientId || !doctorId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Patient ID and Doctor ID are required' 
      });
    }

    let medicalRecord = await MedicalRecord.findOne({ 
      patient: patientId, 
      doctor: doctorId 
    });

    if (!medicalRecord) {
      medicalRecord = new MedicalRecord({
        patient: patientId,
        doctor: doctorId,
        vitals: vitals || null,
        timeline: timelineEvent ? [timelineEvent] : [],
        allergies: allergies || []
      });
    } else {
      if (vitals) {
        medicalRecord.vitals = vitals;
      }
      
      if (timelineEvent) {
        medicalRecord.timeline.unshift(timelineEvent);
      }

      if (allergies && Array.isArray(allergies)) {
        allergies.forEach(newAllergy => {
          const exists = medicalRecord.allergies.some(
            a => a.name === newAllergy.name
          );
          if (!exists) {
            medicalRecord.allergies.push(newAllergy);
          }
        });
      }
    }

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
// Controller to get medical records by patient only
export const getMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    const medicalRecord = await MedicalRecord.findOne({
      patient: patientId
    }).populate('patient doctor');

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    return res.status(200).json({
      success: true,
      medicalRecord
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




export const updatePatientVitals = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { vitals } = req.body;

    if (!vitals || typeof vitals !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Vitals data is required'
      });
    }

    const medicalRecords = await MedicalRecord.find({ patient: userId });

    if (!medicalRecords || medicalRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No medical records found for this patient'
      });
    }

    const updatePromises = medicalRecords.map(record => {
      record.vitals = vitals;
      return record.save();
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      message: 'Vitals updated successfully',
      data: vitals
    });

  } catch (error) {
    console.error('Error updating patient vitals:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};