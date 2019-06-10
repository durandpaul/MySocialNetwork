'use strict';
const express = require('express');
const router = express.Router();
const userS = require('../services/userS');

router.post('/create', userS.signUp);
router.get('/all', userS.getUsers);
router.get('/:id', userS.getUserById);
router.put('/:id', userS.updateUser);
router.delete('/:id', userS.deleteUser);

module.exports = router;
