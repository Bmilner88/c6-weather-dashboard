require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const weather = require('./weather');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', weather);

app.listen(port, () => console.log(`App listening on port ${port}`));