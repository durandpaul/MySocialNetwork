'use strict';

let mongoose = require('mongoose');

var ResponseSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

export const Response =  mongoose.model('Response', ResponseSchema); 

