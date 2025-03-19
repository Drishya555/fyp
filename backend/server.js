import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoute from './routes/UserRoute.js'
import docRoute from './routes/DocRoutes.js'
import pharmaRoute from './routes/PharmacyRoutes.js'
import cartRoute from './routes/cartRoute.js'
import connectDB from './config/db.js';
import appointmentRoute from './routes/AppointmentRoute.js'
import hospitalRoute from './routes/HospitalRoute.js'

const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth',authRoute)
app.use('/api/doctors',docRoute)
app.use('/api/pharmacy', pharmaRoute)
app.use('/api/cart', cartRoute)
app.use('/api/appointment', appointmentRoute)
app.use('/api/hospital', hospitalRoute)


const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgGreen.white)
})