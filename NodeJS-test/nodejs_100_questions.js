
// =========================
// Node.js 100 Questions & Solutions
// =========================

// -------------------------
// Beginner Level (1-10)
// -------------------------

// 1. Hello World HTTP Server
const http = require('http');

function helloWorldServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });

  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
}
// helloWorldServer();

// 2. Read File Content
const fs = require('fs');

function readFileContent() {
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File content:", data);
  });
}
// readFileContent();

// 3. Write to File
function writeToFile() {
  const content = "New file content";
  fs.writeFile('output.txt', content, err => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully");
  });
}
// writeToFile();

// 4. CLI Calculator
function cliCalculator() {
  const [,, operator, num1, num2] = process.argv;
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  switch(operator) {
    case '+': console.log(a + b); break;
    case '-': console.log(a - b); break;
    case '*': console.log(a * b); break;
    case '/': console.log(a / b); break;
    default: console.log('Invalid operator');
  }
}
// cliCalculator();

// 5. Path Joining
const path = require('path');

function joinPathExample() {
  const fullPath = path.join(__dirname, 'documents', 'report.txt');
  console.log("Full path:", fullPath);
}
// joinPathExample();

// -------------------------
// Intermediate Level (31-35)
// -------------------------

// 31. CRUD API for Todos
const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
let idCounter = 1;

app.post('/todos', (req, res) => {
  const todo = { id: idCounter++, ...req.body };
  todos.push(todo);
  res.status(201).json(todo);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).send('Not found');
  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

// Uncomment to run CRUD API
// app.listen(3000, () => console.log('CRUD API running on port 3000'));

// 32. Route Parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  res.json({
    userId: req.params.userId,
    postId: req.params.postId
  });
});

// 33. JWT Authentication Middleware
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 34. File Upload with Multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// -------------------------
// Advanced Level (66-70)
// -------------------------

// 66. MongoDB Indexing
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true },
  name: { type: String, index: true }
});

userSchema.index({ name: 1, email: 1 }); // Compound index

// 67. Redis Pub/Sub
const redis = require('redis');
const pub = redis.createClient();
const sub = redis.createClient();

sub.subscribe('notifications');
sub.on('message', (channel, message) => {
  console.log(`Received ${message} from ${channel}`);
});

pub.publish('notifications', 'New user registered');

// 68. Role-Based Access Control
function roleMiddleware(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
}

app.get('/admin', roleMiddleware(['admin', 'superadmin']), (req, res) => {
  res.send('Admin dashboard');
});

// -------------------------
// Expert Level (96-100)
// -------------------------

// 100. Microservice Optimization with Cluster
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

function startClusteredServer() {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {

    require('http').createServer((req, res) => {
      res.end('Hello from optimized server');
    }).listen(3000);
  }
}
// startClusteredServer();
