/* eslint-disable no-console */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://olgaluk:111@gettingstarted-w5aal.mongodb.net/journal?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const path = require('path');
const cors = require('./utils/cors');

app.use(cors);
app.use(express.static(path.join(__dirname, '/html')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err) res.status(500).send('Something broke!');
  next();
});

const students = require('./routes/students');
const subjects = require('./routes/subjects');
const teachers = require('./routes/teachers');

app.use('/students', students);
app.use('/subjects', subjects);
app.use('/teachers', teachers);

app.listen(3004, () => {
  console.log('Started listening on port', 3004);
});
