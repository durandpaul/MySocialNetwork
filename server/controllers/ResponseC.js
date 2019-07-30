'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = require('../corsOption');
const responseS = require('../services/ResponseS');

router.post('/create', cors(corsOptions), responseS.addResponse);
router.get('/apostresponse/:id', cors(corsOptions), responseS.getResponsesByPost);

module.exports = router;