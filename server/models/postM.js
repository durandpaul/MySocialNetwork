'use strict';

let mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    title: String,
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

export const Post = mongoose.model('Post', PostSchema);