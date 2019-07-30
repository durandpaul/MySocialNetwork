'use strict';
const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const cors = require('cors') ;
const http = require('http').Server(app);
const bodyParser = require('body-parser');

import { cookiesConfig } from './config/cookies';

app.set('trust proxy', 1); // trust first proxy
// console.log(cookiesConfig);
app.use(cookieSession(cookiesConfig));


import { connectionDb } from './connection';
import { localConfig } from './config/local';


const api = require('./routes/index');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || localConfig.port;

app.use('/server', api);


http.listen(port, () => {
    console.log(`listening on ${port}`);
});