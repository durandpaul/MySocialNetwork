'user strict';

import {
    Response
} from '../models/responseM';


const addResponse = async (req, res) => {
    try {
        console.log("addResponse", req.body);
        
        const {
            postId,
            username,
            message
        } = req.body

        if (postId === undefined || postId === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'post id is required',
                'field': 'post id'
            });
        }

        if (username === undefined || username === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'user id is required',
                'field': 'user id'
            });
        }

        if (message === undefined || message === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'message is required',
                'field': 'message'
            });
        }

        const responseData = {
            postId,
            username,
            message
        }

        let newResponse = await Response.create(responseData);

        if (newResponse) {
            return res.status(201).json({
                'message': 'successfully posted',
                'data': newResponse
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

const getResponsesByPost = async(req, res) => {

    try {
        let apostId = req.params.id;
        // console.log('getResponsesByPost', apostId);
        
        if (apostId === undefined || apostId === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'user id is required',
                'field': 'user id'
            });
        }

        let responses = await Response.find({postId: apostId});

        // console.log("getResponsesByPost responses", responses);
        
        if (responses.length > 0) {
            return res.status(200).json({
                'message': 'Posts fetched successfully',
                'data': responses
            });
        }

        // return res.status(404).json({
        //     'code': 'BAD_REQUEST_ERROR',
        //     'description': 'No Posts found in the system'
        // });


    } catch (error) {
         return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }

}

export {
    addResponse,
    getResponsesByPost
}