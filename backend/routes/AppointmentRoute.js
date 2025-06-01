import express from 'express';
import { 
  createappointment, 
  deleteappointmentcontroller, 
  getallappointment,
  getappointmentbyHospital,
  getsingleappointmentbydoctor,
  getsingleappointment,
  getappointmentbyuser,
  getappapointmentbydoctor, 
  updateAppointmentStatus,
  rescheduleAppointment,
  handleAppointmentNotes
} from '../controllers/appointmentController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createappointment', authenticateToken, createappointment);
router.get('/viewallappointments', authenticateToken, getallappointment);
router.get('/viewsingleappointment/:id', authenticateToken, getsingleappointment);
router.get('/getappointmentbydoctor/:id', authenticateToken, getsingleappointmentbydoctor);
router.get('/getallappointmentsbydoctor/:id', authenticateToken, getappapointmentbydoctor);
router.put('/notes/:id', authenticateToken, handleAppointmentNotes);
router.get('/getappointmentbyuser/:id', authenticateToken, getappointmentbyuser);
router.get('/getappointmentbyhospital/:id', authenticateToken, getappointmentbyHospital);
router.put('/updateappointment/:id', authenticateToken, updateAppointmentStatus);
router.delete('/deleteappointment/:id', authenticateToken, deleteappointmentcontroller);
router.delete('/deleteappointment/:id', authenticateToken, deleteappointmentcontroller);
router.put('/reschedule/:id', rescheduleAppointment);

export default router;