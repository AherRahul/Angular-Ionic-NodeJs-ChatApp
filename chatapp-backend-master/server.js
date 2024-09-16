require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const _ = require('lodash');

const app = express();
const url = 'mongodb+srv://aherrahul1:R@hu95heR@cluster0.15fjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:4200', 'http://rds-chat-app.netlify.app/', 'https://rds-chat-app.netlify.app/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, OPTIONS");
  next();
});

// // CORS options delegate function to dynamically set the allowed origin
// const corsOptionsDelegate = (req, callback) => {
//   let corsOptions;
//   if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // Reflect the origin
//   } else {
//     corsOptions = { origin: false }; // Block the origin
//   }
//   callback(null, corsOptions); // Callback expects two parameters: error and options
// };

// app.options('*', cors(corsOptionsDelegate)); // Handle OPTIONS request globally

// Socket.io Config
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { User } = require('./Helpers/UserClass');

require('./socket/streams')(io, User, _);
require('./socket/private')(io);

// Imports of project files
const dbConfig = require('./config/secret');
const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');
const message = require('./routes/messageRoutes');
const image = require('./routes/imageRoutes');

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// DB Connection
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to database.');
})
.catch((error) => {
  console.error('Error connecting to database', error);
  process.exit(1);
});

// Routes
app.use('/api/chatapp', auth);
app.use('/api/chatapp', posts);
app.use('/api/chatapp', users);
app.use('/api/chatapp', friends);
app.use('/api/chatapp', message);
app.use('/api/chatapp', image);

// Initializing Port
const port = process.env.PORT || 8080;

// Server Created
server.listen(port, () => {
  console.log('Listening on port ' + port);
});
