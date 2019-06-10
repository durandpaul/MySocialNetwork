'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

import { connectionDb } from './connection';
import { localConfig } from './config/local';

const api = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || localConfig.port;


app.use('/server', api);


http.listen(port, () => {
    console.log(`listening on ${port}`);
});