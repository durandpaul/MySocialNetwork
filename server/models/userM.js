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
    },
    gender : {
        type: String,
        default: 'male'
    },
    avatar: {
        type: String,
        default: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
    }
});


export const User = mongoose.model('User', UserSchema);