const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/db');
const bookRoute = require("./node-backend/router/book.routes");
const createError = require('http-errors');

mongoose.Promise = global.Promise;
mongoose.connect(mongodb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection established');
},
  error => {
    console.log('Database error:' + error);
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname,'dist/Bookstore')));
app.use('/api', bookRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
//404 Error
app.use((req, res, next)=>{
  next(createError(404));
});

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if(!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

