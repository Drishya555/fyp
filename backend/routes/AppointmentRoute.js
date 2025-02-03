import express from 'express';

const router = express.Router();

router.post('/createappointment')
router.get('/viewallappointments')
router.get('/appointmentdetail/:id')
router.put('/updateappointment/:id')
router.put('/deleteappointment/:id')

export default router;