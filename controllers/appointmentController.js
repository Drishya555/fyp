import { getdaAppointment, postAppointment } from "../db/queries";

export const getAppointment = async(req,res) =>{
    try {
        const { date } = req.query;
        const schedules = await getdaAppointment(date);
        res.json(schedules);
      } catch (err) {
        console.error(err.message);
      }
}

export const scheduleAppointment = async(req,res) =>{
    try {
        const { date, event } = req.body;
        const newEvent = await postAppointment(date,event);
        res.json(newEvent);
      } catch (err) {
        console.error(err.message);
      }
}


