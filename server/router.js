const express = require('express');
const route = express.Router();
const render = require('./render');
const employeeController = require('../controllers/employeeController');

// BROWSER Routes
//route.get('/', (req, res) => {res.render('index')});
route.get('/', render.homeRoutes);
route.get('/edit-employee', render.edit_employee); // just display

// API Routes
route.post('/employee', employeeController.create);
route.get('/employee', employeeController.find);
route.put('/employee/:id', employeeController.update); // updating in both, API and browser
route.delete('/employee/:id', employeeController.delete);

module.exports = route;