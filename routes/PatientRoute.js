import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const router = express.Router();

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

router.post('/addpatient', async(req,res)=>{
    const {userid, sex, blood, nationality, doctorid, age, phone, nurseid, hospitalid, email} = req.body;
    const client = createClient();
    await client.connect();

    try {

          // Step 2: Check if the doctor is already added.
          const doctorExists = await client.query(
            'SELECT * FROM public.patients WHERE userid = $1;', [userid]
          );
      
          if (doctorExists.rows.length > 0) {
            return res.status(400).json({ message: 'Patient already exists.' });
          }
         
        const result = await client.query(
            `INSERT INTO public.patients(userid, sex, blood, nationality, doctorid, age, phone, nurseid, hospitalid)	VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9);`,
            [userid, sex, blood, nationality, doctorid, age, phone, nurseid, hospitalid]
        );


           // Step 4: Update the user's role to 2 (Doctor).
      await client.query(
        'UPDATE public.users SET roleid = $1 WHERE email = $2;', [3, email]
      );
  
      // Step 5: Send the inserted doctor record as a response.
      res.status(201).json(result.rows[0]);
  
          
        return result.rows[0];
    } catch (err) {
        console.log("Error finding user: ", err.message);
    }finally{
        await client.end();
    }

})

export default router;
