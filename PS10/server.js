const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: idCounter++, text: req.body.text };
  tasks.push(task);
  res.sendStatus(201);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) task.text = req.body.text;
  res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
