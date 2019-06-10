'use strict';
const express = require('express');
const router = express.Router();
const userC = require('../../controllers/UserC');
const postC = require('../../controllers/postC');
const friendC = require('../../controllers/friendC');

router.use('/user', userC);
router.use('/post', postC);
router.use('/friend', friendC);


module.exports = router;