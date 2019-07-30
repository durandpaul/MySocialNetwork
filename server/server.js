'use strict';
const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const cors = require('cors') ;
const http = require('http').Server(app);
const bodyParser = require('body-parser');

import { cookiesConfig } from './config/cookies';
import { connectionDb } from './connection';
import { localConfig } from './config/local';

const port = process.env.PORT || localConfig.port;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('trust proxy', 1); // trust first proxy
// console.log(cookiesConfig);
app.use(cookieSession(cookiesConfig));


// app.use(express.static(__dirname +  '/dist'));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

const api = require('./routes/index');

app.use('/server', api);

http.listen(port, () => {
    console.log(`listening on ${port}`);
});