import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

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


const router = express.Router();


router.post('/add-hospital', async(req, res, name, address, rating)=>{

    const client = createClient();
    await client.connect();

    try {
        const result = await client.query(
            `INSERT INTO public.hospital(hospitalname, hospitaladdress, hospitalrating)	VALUES ($1, $2, $3);`,
            [name, address, rating]
          );
          
        return result.rows[0];
    } catch (err) {
        console.log("Error finding user: ", err.message);
    }finally{
        await client.end();
    }
})

router.get('/all-hospitals', async(req,res)=>{
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query('SELECT *	FROM public.hospital;');
        if (result.rows.length > 0) {
            res.status(200).json({ roles: result.rows });  
          } else {
            res.status(404).json({ message: 'No Hospitals found.' });  // Use 404 for not found
          }    } catch (err) {
        console.log("Error finding user: ", err.message);
        throw err; // Re-throw the error for better handling
    } finally {
        await client.end();
    }
})




export default router;