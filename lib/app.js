/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('Famous Dinos API');
});

// API routes,
app.get('/api/dinos', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              dinorder,
              diet,
              region,
              era,
              url,
              specimens_found as "specimensFound"
      FROM    dinos;
    `);

    // send back the data
    res.json(data.rows); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.get('/api/dinos/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT id,
      name,
      dinorder,
      diet,
      region,
      era,
      url,
      specimens_found as "specimensFound"
      FROM dinos WHERE id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.post('/api/dinos', async (req, res) => {
  try {
    const dino = req.body;
    console.log(dino);

    const data = await client.query(`
      INSERT INTO dinos (name, dinorder, diet, region, era, url, specimens_found)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, dinorder, diet, region, era, url, specimens_found as "specimensFound";
    `, [dino.name, dino.dinorder, dino.diet, dino.region, dino.era, dino.url, dino.specimensFound]);

    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });      
  }
});

app.put('/api/dinos/:id', async (req, res) => {
  try {
    const dino = req.body;

    const data = await client.query(`
    UPDATE  dinos 
      SET   name = $1, dinorder = $2, diet = $3, 
            region = $4, era = $5, url = $6, specimens_found = $7
    WHERE   id = $8
    RETURNING id, name, dinorder, diet, region, era, url, specimens_found as "specimensFound";
    `, [dino.name, dino.dinorder, dino.diet, dino.region, dino.era, dino.url, dino.specimensFound, req.params.id]);

    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/dinos/:id', async (req, res) => {
  try {
    const data = await client.query(`
      DELETE FROM dinos
      WHERE id = $1
      RETURNING id, name, dinorder, diet, region, era, url, specimens_found as "specimensFound";
    `,
    [req.params.id]);

    res.json(data.rows[0]);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


export default app;
