'use strict';

import {
    Friend
} from '../models/friendM';


const addFriendList = async (req, res, next) => {

    try {
        const {
            userid,
            friendid,
            friendname
        } = req.body;

        if (userid === undefined || userid === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'userId is required',
                'field': 'userId'
            });
        }

        if (friendid === undefined || friendid === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'idFriend is required',
                'field': 'idFriend'
            });
        }

        if (friendname === undefined || friendname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'friendname is required',
                'field': 'friendname'
            });
        }

        const friendData = {
            userid,
            members: [{
                friendid,
                friendname
            }],
        }

        let newFriend = await Friend.create(friendData);

        if (newFriend) {
            return res.status(201).json({
                'message': 'successfully posted',
                'data': newFriend
            });
        } else {
            throw new Error('something went worng');
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }

}

const updateFriendList = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const {
            friendid,
            friendname
        } = req.body;

        if (friendid === undefined || friendid === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'idFriend is required',
                'field': 'idFriend'
            });
        }

        if (friendname === undefined || friendname === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'friendname is required',
                'field': 'friendname'
            });
        }

        const newFriend = {
            friendid,
            friendname
        }

        let addFriend = await Friend.findOneAndUpdate(
            { userid: userId }, 
            { $push: { members: newFriend } },
            { new: true}
        );

        if (addFriend) {
            return res.status(200).json({
                'message': 'friendlist updated successfully',
                'data': addFriend
            });
        } else {
            throw new Error('something went wrong');
        }
    } catch(err) {        
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });

    }
}

const deleteFriend = async (req, res, next) => {
    try {
        let userId = req.params.id;
        const friendId = req.body.friendid;
        
        if (friendId === undefined || friendId === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'friend id is required',
                'field': 'friend id'
            });
        }

        let friendToDelete = await Friend.findOneAndUpdate(
            { userid: userId },
            { $pull: { members: { friendid: friendId } } }
        ); 

        if (friendToDelete) {
            return res.status(204).json({
                'message': `friend with id ${userId} deleted successfully`
            });
        } 

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No friend found in the system'
        });

    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}


export {
    addFriendList,
    updateFriendList,
    deleteFriend
};