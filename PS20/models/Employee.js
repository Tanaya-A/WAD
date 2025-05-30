const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  designation: String,
  salary: Number,
  joiningDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
