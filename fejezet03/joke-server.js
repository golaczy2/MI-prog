// api szerver amely egy véletlenszerű viccet ad válaszként

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const viccek = require('./viccek.json');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/viccek', (req, res) => {
  res.json(viccek);
});

app.get('/viccek/:id', (req, res) => {
  const { id } = req.params;
  const vicc = viccek.find((vicc) => vicc.id === id);
  res.json(vicc);
  console.log(vicc);
  console.log(id);
  
