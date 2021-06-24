const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./server/connection');

const app = express();

// support .env
dotenv.config();

// database connection
connectDB();

// parse request to body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set view engine
app.set('view engine', 'ejs');

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// load routes
app.use('/', require('./server/router'));
// app.get('/', (req, res) => {
//     // res.send('CRUD')
//     res.render('index')
// });

app.listen(process.env.PORT, () => {
    console.log(`App is running under ${process.env.PORT} port`);
});