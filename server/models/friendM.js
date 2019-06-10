'use strict';

let mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    total: Number,
    members: [{
        friendid: String,
        friendname: String,
        friendship_date: {
            type: Date,
            default: Date.now(),   
        }, 
        status: {
            type: Boolean,
            default: false
        }
    }],
});

export const Friend = mongoose.model('Friend', FriendSchema);
