const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock data
const users = [
  { id: 1, name: 'Alice BE update', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Developer' },
  { id: 3, name: 'Carol', email: 'carol@example.com', role: 'Designer' },
];

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend' });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  const newUser = { id: users.length + 1, name, email, role: role || 'User' };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

module.exports = app;
