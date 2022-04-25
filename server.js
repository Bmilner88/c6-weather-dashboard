const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', htmlRoutes);

app.listen(PORT, () => console.log('Now listening'));