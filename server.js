require('dotenv').config();
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});


console.log(process.env.API_KEY)