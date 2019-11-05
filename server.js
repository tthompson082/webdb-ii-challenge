const express = require('express');

const db = require('./data/db-config');

const server = express();

server.use(express.json());

server.post('/api/cars', (req, res) => {
  const carInfo = req.body;
  db.insert(carInfo, 'id')
    .into('cars')
    .then(car => {
      res.status(201).json(car);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error adding the car' });
    });
});

server.get('/api/cars', (req, res) => {
  db.select('*')
    .from('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error retrieving the cars' });
    });
});

module.exports = server;
