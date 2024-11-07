import express from 'express';
import { getAppointment, scheduleAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/api/schedules',getAppointment );
  
  // POST a new schedule event
router.post('/api/schedules', scheduleAppointment);


export default router