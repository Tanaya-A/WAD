const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Add new employee
router.post('/', async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    const savedEmp = await newEmp.save();
    res.status(201).json(savedEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
