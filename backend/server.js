import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoute from './routes/AuthRoute.js'
import connectDB from './config/db.js';

const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth',authRoute)

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgGreen.white)
})