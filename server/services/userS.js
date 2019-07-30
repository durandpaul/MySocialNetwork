'use strict';

var cookieSession = require('cookie-session');

import {
    User
} from '../models/userM';


const signUp = async (req, res, next) => {
    try {
        const {
            firstname,
            lastname,
            username,
            password,
            email,
            birthday,
        } = req.body;

        if (firstname === undefined || firstname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'firstname is required',
                'field': 'firstname'
            });
        }

        if (lastname === undefined || lastname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'lastname is required',
                'field': 'lastname'
            });
        }

        if (username === undefined || username === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'username is required',
                'field': 'username'
            });
        }

        if (password === undefined || password === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'password is required',
                'field': 'password'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email is required',
                'field': 'email'
            });
        }

        let isEmailExists = await User.findOne({
            "email": email
        });

        if (isEmailExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREADY_EXISTS',
                'description': 'email already exists',
                'field': 'email'
            });
        }

        const userInfo = {
            firstname,
            lastname,
            username,
            password,
            email,
            birthday,
        }

        let newUser = await User.create(userInfo);

        if (newUser) {
            return res.status(201).json({
                'message': 'user created successfully',
                'newuser': newUser
            });
        } else {
            throw new Error('something went worng');
        }

    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }

}

const signIn = async (req, res, next) => {
    try {

        const {
            username,
            password,
        } = req.body;

        if (username === undefined || username === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'username is required',
                'field': 'username'
            });
        }

        if (password === undefined || password === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'password is required',
                'field': 'password'
            });
        }

        let user = await User.findOneAndUpdate({
            'username': username,
            'password': password
        }, {
            $set: {
                status: true
            }
        });
        
        if (!user) {
            return res.status(500).json({
                'message': `user with username ${username} or  password not found`,
            });
        } else {
            
            req.sessionCookies.username = username;
            req.sessionCookies.userid = user.id;
            req.sessionCookies.userStatus = user.status;

            // console.log(" login after req.sessionCookies", req.sessionCookies );

            let userConnect = {
                username: user.username,
                status: user.status,
                _id: user._id
            }
            
            return res.status(200).json({
                'message': `user with username ${username} find successfully`,
                'user': userConnect, 
            });

        }

    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const signOut = async (req, res, next) => {
    try {
        const id = req.body.id;

        if (id === undefined || id === '') {
            return res.status(500).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'id is required',
                'field': 'id'
            });
        }

        let userId = await User.findByIdAndUpdate(id, {
            $set: {
                status: false
            }
        });
            console.log('deco userId', userId);
            
        if (!userId) {
            return res.status(500).json({
                'message': `user with username ${userId._id} not found`
            });
        } else {
            req.session = null;
            return res.status(200).json({
                'message': `user with id ${userId._id} logout`,
                'id': userId._id
            });
        }

    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getUsers = async (req, res, next) => {
    try {

        let users = await User.find({});

        if (users.length > 0) {
            return res.status(200).json({
                'message': 'users fetched successfully',
                'data': users
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });
    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}


const getUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).json({
                'message': `user with id ${req.params.id} fetched successfully`,
                'data': user
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const updateUser = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const {
            firstname,
            lastname,
            email
        } = req.body;

        if (firstname === undefined || firstname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }


        if (lastname === undefined || lastname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email is required',
                'field': 'email'
            });
        }


        let isUserExists = await User.findById(userId);

        if (!isUserExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No user found in the system'
            });
        }

        const updateInfo = {
            firstname,
            lastname,
            email
        }

        let updateUser = await User.findByIdAndUpdate(userId, updateInfo, {
            new: true
        });

        if (updateUser) {
            return res.status(200).json({
                'message': 'user updated successfully',
                'data': updateUser
            });
        } else {
            throw new Error('something went wrong');
        }
    } catch (err) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let userId = req.params.id;
        let user = await User.findByIdAndRemove(userId);

        if (user) {
            return res.status(204).json({
                'message': `user with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (err) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

// const getConnection = async (req, res) => {

//     if(req.params.id) {

//         return res.status(200).json({
//             'message': `user with id ${req.params.id} already connect`,
//             'connection': req.
//         });
//     }

// }

export {
    signUp,
    signIn,
    signOut,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};