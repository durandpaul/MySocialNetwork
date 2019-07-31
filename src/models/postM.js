'use strict';

let mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    title: String,
    message: {
        type: String,
        required: true
    },
    image: String,
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