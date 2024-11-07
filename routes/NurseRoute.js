import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';


const router = express.Router();

dotenv.config({path:'../.env'});

const {Client} = pkg;

// Function to create a new database client
const createClient = () => {
    return new Client({
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.DBPORT,
        password: process.env.DBPW,
        database: process.env.DATABASE
    });
};



router.post('/addnurse', async(req,res)=>{
    const {userid, phone, age, licenseid, hospitalid, doctorid} = req.body;
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query(
            `INSERT INTO public.nurses(userid, phone, age, licenseid, hospitalid, doctorid) VALUES ($1, $2, $3, $4, $5, $6);`,
            [userid, phone, age, licenseid, hospitalid, doctorid]
          );
          
        return result.rows[0];
    } catch (err) {
        console.log("Error finding user: ", err.message);
    }finally{
        await client.end();
    }

})

export default router;
