import express from 'express';
import { createappointment, deleteappointmentcontroller, getallappointment,getappointmentbyHospital,getsingleappointmentbydoctor,getsingleappointment,getappointmentbyuser, getappapointmentbydoctor, updateAppointmentStatus} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/createappointment', createappointment)
router.get('/viewallappointments',getallappointment )
router.get('/viewsingleappointment/:id',getsingleappointment)
router.get('/getappointmentbydoctor/:id',getsingleappointmentbydoctor)
router.get('/getallappointmentsbydoctor/:id',getappapointmentbydoctor)
router.get('/getappointmentbyuser/:id',getappointmentbyuser)
router.get('/getappointmentbyhospital/:id',getappointmentbyHospital)
router.put('/updateappointment/:id')
router.delete('/deleteappointment/:id',deleteappointmentcontroller)
router.put("/updateappointment/:id", updateAppointmentStatus);

export default router;