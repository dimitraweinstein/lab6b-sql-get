const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/owls', async (req, res) => {
  try {
    const data = await client.query(`
      SELECT owls.id, owls.name, owls.note, owls.endangered_id, 
      owls.habitat, owls.price, endangered.endangered 
      from owls
        JOIN endangered
        ON endangered.id = owls.endangered_id`);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/endangered', async (req, res) => {
  try {
  
    const data = await client.query('SELECT endangered FROM endangered');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/owls/:id', async (req, res) => {
  try {
    const data = await client.query(`
      SELECT
        owls.id,
        owls.name,
        owls.note,
        owls.endangered_id,
        owls.habitat,
        owls.price,
        endangered.endangered FROM owls
      JOIN endangered
      ON endangered.id = owls.endangered_id 
        WHERE owls.id=$1
        `, [req.params.id]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/owls', async (req, res) => {
  try {
    const data = await client.query(`
      INSERT INTO owls (name, note, endangered_id, habitat, price, owner_id)
      VALUES ($1, $2, $3, $4, $5, 1)
      RETURNING *`, [req.body.name, req.body.note, req.body.endangered_id, req.body.habitat, req.body.price]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.put('/owls/:id', async (req, res) => {
  try {
    console.log(req.body);
    const data = await client.query(`
      UPDATE owls
        set name=$1,
        note=$2,
        endangered_id=$3,
        habitat=$4,
        price=$5
      WHERE id=$6
      RETURNING *
      `, [req.body.name, req.body.note, req.body.endangered_id, req.body.habitat, req.body.price, req.params.id]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.delete('/owls/:id', async (req, res) => {
  try {
    const data = await client.query('DELETE from owls WHERE id=$1', [req.params.id]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;

