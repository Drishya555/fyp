import express from "express";
import {
  getOrCreateMedicalRecord,
  updateMedicalRecord,
  addVitals,
  addTimelineEvent,
  linkAppointment,
  linkPrescription,
  getCompleteHistory
} from "../controllers/medicalRecordController.js";

const router = express.Router();

router.get("/patient/:patientId", getOrCreateMedicalRecord);
router.put("/:id", updateMedicalRecord);
router.post("/:id/vitals", addVitals);
router.post("/:id/timeline", addTimelineEvent);
router.post("/:id/link-appointment", linkAppointment);
router.post("/:id/link-prescription", linkPrescription);
router.get("/patient/:patientId/history", getCompleteHistory);

export default router;