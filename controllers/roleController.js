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


export const addnewrole = async (req, res) => {
    const { name } = req.body;
    const client = createClient();
  
    try {
      await client.connect();
      const result = await client.query(
        'INSERT INTO public.roles(rolename) VALUES ($1) RETURNING *;',
        [name]
      );
  
      if (result.rows.length > 0) {
        res.status(201).json({ role: result.rows[0] });
      } else {
        res.status(400).json({ message: 'Role not created.' });
      }
    } catch (err) {
      console.error('Error adding new role:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client.end();
    }
  };
  


export const getRole = async(req,res)=>{
  const {name} = req.body;
  const client = createClient();

  try{
    await client.connect();
    const result = await client.query(
      'SELECT rolename FROM public.roles WHERE rolename = $1;', [name]
    );
    if (result.rows.length > 0) {
      res.status(201).json({ role: result.rows[0] });
    } else {
      res.status(400).json({ message: 'Role not created.' });
    }
  }catch (err) {
    console.error('Error adding new role:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}



export const getAllRoles = async (req, res) => {
  const client = createClient();

  try {
    await client.connect();
    const result = await client.query('SELECT rolename FROM public.roles');

    if (result.rows.length > 0) {
      res.status(200).json({ roles: result.rows });  // Return all roles
    } else {
      res.status(404).json({ message: 'No roles found.' });  // Use 404 for not found
    }
  } catch (err) {
    console.error('Error fetching roles:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.end();
  }
};
