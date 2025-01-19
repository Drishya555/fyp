import express from 'express'
import multer from 'multer'
import {Pool} from 'pg';

const router = express.Router();

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DATABASE
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post('/addimg', upload.single('image'), async (req, res) => {
    const { imageName } = req.body; // Add metadata if required
    const imageFile = req.file; // Image file data
  
    if (!imageFile) {
      return res.status(400).send({ message: 'Image file is required' });
    }
  
    try {
      // Insert image data into the database
      const query = `
        INSERT INTO images (name, data, mime_type)
        VALUES ($1, $2, $3) RETURNING *;
      `;
      const values = [
        imageName || imageFile.originalname, // Image name from request or file
        imageFile.buffer,
        imageFile.mimetype, 
      ];
  
      const result = await pool.query(query, values);
  
      res.status(201).send({
        message: 'Image added successfully',
        image: result.rows[0],
      });
    } catch (error) {
      console.error('Error inserting image into database:', error);
      res.status(500).send({ message: 'Internal Server Error', error });
    }
  });

  

  export default router;