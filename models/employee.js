const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  phone: String,
});

const Employeedb = mongoose.model('employee', schema);

module.exports = Employeedb;
