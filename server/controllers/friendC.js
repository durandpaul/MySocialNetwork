'use strict';
const express = require('express');
const router = express.Router();
const friendS = require('../services/friendS');

router.post('/newlist', friendS.addFriendList);
router.put('/update/:id', friendS.updateFriendList);
router.put('/delete/:id', friendS.deleteFriend);

module.exports = router;