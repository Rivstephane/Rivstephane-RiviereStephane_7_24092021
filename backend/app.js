const express = require('express');
const helmet = require ('helmet');

const postRoutes = require("./routes/post");
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const path = require('path');

const app = express();
app.use(helmet());
  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

module.exports = app;
