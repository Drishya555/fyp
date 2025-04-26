import express from 'express';
import {
  createOrUpdateMedicalRecord,
  getMedicalRecord,
  updatePatientVitals,
} from '../controllers/medicalRecordController.js';

const router = express.Router();
router.post('/', createOrUpdateMedicalRecord);
router.put('/patient-vitals', updatePatientVitals); 
router.get('/:patientId', getMedicalRecord);

export default router;