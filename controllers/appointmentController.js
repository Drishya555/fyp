import { getdaAppointment, postAppointment } from "../db/queries.js";

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
        const { date, docid, patid, purpose, time } = req.body;
        const newEvent = await postAppointment(date,docid, patid, purpose, time);
        res.json(newEvent);
      } catch (err) {
        console.error(err.message);
      }
}


