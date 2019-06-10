'use strict';
const express = require('express');
const router = express.Router();
const postS = require('../services/postS');

router.post('/create', postS.createPost);
router.delete('/delete/:id', postS.deletePost);
router.put('/update/:id', postS.updatePost);
router.get('/all/:id', postS.getPosts);
router.get('/:id', postS.getaPost);


module.exports = router;