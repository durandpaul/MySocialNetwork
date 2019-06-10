'use strict';

let mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: 'newuser'
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    status: {
        type: Boolean,
        default: false
    },
    inscription_date: {
        type: Date,
        default: Date.now()
    }
});


export const User = mongoose.model('User', UserSchema);