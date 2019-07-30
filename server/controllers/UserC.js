'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = require('../corsOption');
const userS = require('../services/userS');
const cookieSession = require('cookie-session');

import { cookiesConfig } from '../config/cookies';


router.post('/create', cors(corsOptions), userS.signUp);
router.post('/login', cors(corsOptions), cookieSession(cookiesConfig), userS.signIn);
router.post('/logout', cors(corsOptions), userS.signOut);
router.get('/all', cors(corsOptions), userS.getUsers);
router.get('/:id', cors(corsOptions), userS.getUserById);
router.put('/:id', cors(corsOptions), userS.updateUser);
router.delete('/:id', cors(corsOptions), userS.deleteUser);

module.exports = router;
