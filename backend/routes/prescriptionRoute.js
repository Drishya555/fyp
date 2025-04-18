import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionsByUserId,
  getPrescriptionsByDoctorId,
  getPrescriptionById,
  updatePrescription,
  deletePrescription
} from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/', createPrescription);
router.get('/', getAllPrescriptions);
router.get('/user/:userId', getPrescriptionsByUserId);
router.get('/doctor/:doctorId', getPrescriptionsByDoctorId);
router.get('/:id', getPrescriptionById);
router.put('/:id', updatePrescription);
router.delete('/:id', deletePrescription);

export default router;