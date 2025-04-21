import express from 'express';
import {
  createOrUpdateMedicalRecord,
  getMedicalRecord,
} from '../controllers/medicalRecordController.js';

const router = express.Router();
router.post('/', createOrUpdateMedicalRecord);

// GET /api/medical-records/:patientId/:doctorId
router.get('/:patientId/:doctorId', getMedicalRecord);

export default router;