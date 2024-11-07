import colors from 'colors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connectDB = async()=>{
    
const { Client } = pkg;  // Extract Client from pg  

const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DATABASE
})


try{
    client.connect();
    console.log(`Connected to database ${process.env.DATABASE}`.bgGreen.white)
}catch(err){
    console.log(err.message)
}


client.query(`SELECT * FROM users`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;
})



}


export default connectDB;