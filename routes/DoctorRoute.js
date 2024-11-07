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


router.post('/new-doctor', async (req, res) => {
    const { email, specialization, licence, age, phone, rating, hosid } = req.body;
    const client = createClient();
  
    await client.connect();
  
    try {
      // Step 1: Fetch the user ID based on the email.
      const docuidResult = await client.query(
        'SELECT userid FROM public.users WHERE email = $1;', [email]
      );
  
      if (docuidResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const docuid = docuidResult.rows[0].userid;
  
      // Step 2: Check if the doctor is already added.
      const doctorExists = await client.query(
        'SELECT * FROM public.doctors WHERE userid = $1;', [docuid]
      );
  
      if (doctorExists.rows.length > 0) {
        return res.status(400).json({ message: 'Doctor already added.' });
      }
  
      // Step 3: Insert the new doctor.
      const result = await client.query(
        `INSERT INTO public.doctors(userid, specialization, licenseno, age, phone, hospitalid, rating) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [docuid, specialization, licence, age, phone, hosid, rating]
      );
  
      // Step 4: Update the user's role to 2 (Doctor).
      await client.query(
        'UPDATE public.users SET roleid = $1 WHERE email = $2;', [2, email]
      );
  
      // Step 5: Send the inserted doctor record as a response.
      res.status(201).json(result.rows[0]);
  
    } catch (err) {
      console.error('Error creating doctor:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client.end();
    }
  });

export default router;