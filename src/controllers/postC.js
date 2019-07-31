'use strict';
const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = require('../corsOption');
const postS = require('../services/postS');

router.post('/create', cors(corsOptions), postS.createPost);
router.delete('/delete/:id', cors(corsOptions), postS.deletePost);
router.put('/update', cors(corsOptions), postS.updatePost);
router.get('/all/:id', cors(corsOptions), postS.getPosts);
router.get('/:id', cors(corsOptions), postS.getaPost);


module.exports = router;