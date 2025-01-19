//importing
import express from 'express';
import cors from 'cors'
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import auth from './routes/authRoute.js'
import cald from './routes/AppointmentRoute.js'
import roleroute from './routes/RoleRoute.js'
import hospitalroute from './routes/hospitalRoute.js'
import docroute from './routes/DoctorRoute.js'
import nuroute from './routes/NurseRoute.js'
import patroute from './routes/PatientRoute.js'
import connectDB from './db/db.js';
import testt from './routes/TestRoute.js'
//rest object
const app = express();

//dotenv config
dotenv.config();

connectDB()

//port
const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//route
app.use('/api/fyp/auth',auth);
app.use('/api/fyp/appointment', cald);
app.use('/api/fyp/role',roleroute)
app.use('/api/fyp/hospital',hospitalroute)
app.use('/api/fyp/doctor',docroute)
app.use('/api/fyp/nurse',nuroute)
app.use('/api/fyp/patient',patroute)
app.use('/api/test', testt)



//rest api
app.use('/', function(req,res){
    res.send({message: "Hello World"})
});

//listen on port
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});

