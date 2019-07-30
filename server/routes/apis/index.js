'use strict';
const express = require('express');
const router = express.Router();
const userC = require('../../controllers/UserC');
const postC = require('../../controllers/postC');
const friendC = require('../../controllers/friendC');
const reponseC = require('../../controllers/ResponseC');

router.use('/user', userC);
router.use('/post', postC);
router.use('/friend', friendC);
router.use('/response', reponseC);

module.exports = router;