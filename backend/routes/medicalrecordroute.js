import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
  createOrUpdateMedicalRecord,
  getMedicalRecord,
  updatePatientVitals,
} from '../controllers/medicalRecordController.js';

const router = express.Router();

router.post('/', authenticateToken, createOrUpdateMedicalRecord);
router.put('/patient-vitals', authenticateToken, updatePatientVitals);
router.get('/:patientId', authenticateToken, getMedicalRecord);

export default router;