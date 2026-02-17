const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database (for simplicity - in production, use a real database)
let tasks = [
  { id: 1, title: 'Learn REST API basics', description: 'Study HTTP methods and status codes', completed: true, createdAt: new Date().toISOString() },
  { id: 2, title: 'Build a portfolio project', description: 'Create a REST API project for GitHub', completed: false, createdAt: new Date().toISOString() },
  { id: 3, title: 'Apply for jobs', description: 'Send applications to companies', completed: false, createdAt: new Date().toISOString() }
];

let nextId = 4;

// Routes

// GET /api/tasks - Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /api/tasks/:id - Get a single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  res.json({
    success: true,
    data: task
  });
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask
  });
});

// PUT /api/tasks/:id - Update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  const { title, description, completed } = req.body;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title !== undefined ? title : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: tasks[taskIndex]
  });
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  tasks.splice(taskIndex, 1);
  
  res.json({
    success: true,
    message: 'Task deleted successfully'
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available at http://localhost:${PORT}/api/tasks`);
});
