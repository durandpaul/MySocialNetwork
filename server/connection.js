'use strict';

const mongoose = require('mongoose');

import * as confDb from './config/db';

// A utilisé en phase de test

//Set up default mongoose connection

// var mongoDB = 'mongodb+srv://paul:p@ul92@cluster0-ad5t2.gcp.mongodb.net/multidb?retryWrites=true';

// Création connection DB avec Mongoose

// console.log(confDb.default.database);

mongoose.connect(confDb.default.database, {
  useNewUrlParser: true,
  useFindAndModify: false
});

//Get the default connection
let connectionDb = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
connectionDb.on('error', console.error.bind(console, 'MongoDB connection error:'));
connectionDb.once('open', function () {
  // we're connected!
  console.log("Connected to MongoDB database");
});

export default connectionDb;