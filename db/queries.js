//importing necessary packages
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


export const checkExistingUser = async(email) => {
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows.length > 0 ? result.rows[0] : null; // Return null if no user found
    } catch (err) {
        console.log("Error finding user: ", err.message);
        throw err; // Re-throw the error for better handling
    } finally {
        await client.end();
    }
}


export const getid = async(email) =>{
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query(
            `SELECT userid FROM public.users WHERE email = $1;`,
            [email]
          );
          
        return result.rows[0];
    } catch (err) {
        console.log("Error finding user: ", err.message);
    }finally{
        await client.end();
    }
}






export const registerUser = async(name, address,email, hashedPassword, resetToken) =>{
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query(
            `INSERT INTO public.users(name, address, email, password, "resetToken") VALUES ($1, $2, $3, $4, $5);`,
            [name, address, email, hashedPassword, resetToken]
          );
          
        return result.rows[0];
    } catch (err) {
        console.log("Error finding user: ", err.message);
    }finally{
        await client.end();
    }
}



export const getdaAppointment = async(date) =>{
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query('SELECT * FROM schedules WHERE date = $1', [date]);
        return result.rows[0];
    } catch (err) {
        console.log("Error finding user: ", err.message);
    }finally{
        await client.end();
    }
}


export const postAppointment = async(date,docid, patid, purpose, time) =>{
    const client = createClient();
    await client.connect();

    try {
        const result = await client.query('INSERT INTO schedules (date ,docid, patid, purpose, time) VALUES ($1, $2, $3, $4, $5) RETURNING *', [date,docid, patid, purpose, time]);
        return result.rows[0];
    } catch (err) {
        console.log("Error in creating new appointment", err.message)
    }finally{
        await client.end();
    }
}


