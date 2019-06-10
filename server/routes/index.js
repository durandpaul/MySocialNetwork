'use strict';
const express = require('express');
const router = express.Router();
const allRoutes = require('./apis');

router.use('/api', allRoutes);

module.exports = router;