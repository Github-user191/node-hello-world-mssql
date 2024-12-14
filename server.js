const express = require('express');
const sql = require('mssql');
require('dotenv').config(); // Load environment variables from .env file

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const dbConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: true, // Azure SQL requires encryption
    trustServerCertificate: false,
  },
};

// Connect to the database
sql.connect(dbConfig)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection failed', err));

// Define a route to fetch students
app.get('/api/greetings', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Greetings');
    res.json(result.recordset); // Send the data as JSON
  } catch (err) {
    console.error('Error querying the database', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
