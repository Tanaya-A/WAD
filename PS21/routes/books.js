const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, price, genre } = req.body;
    const newBook = new Book({ title, author, price, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update book by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete book by ID
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
