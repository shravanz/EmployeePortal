//==========Dependencies==============================
var express = require('express');
var router = express.Router();
var userServices = require('../services/userServices');
var message = require('../handlers/msg_handler');

//==========Controllers================================
router

    .post('/addUser', function (req, res, next) {

        userServices.addUser(req, function (err, result) {
            if (err) {
                next(err, req, res, next);
            } else {
                res.json({
                    error: false,
                    message: message.RECORD_CREATED,
                    description: [],
                    data: result
                });
            }
        });
    })
    .post('/login', function (req, res, next) {
        userServices.login(req, function (err, userErr, pwdErr, result) {
            if (err) {
                next(err, req, res, next);
            }
            else if (userErr) {
                res.status(409).json({
                    error: true,
                    message: 'please check UserName/password',
                    data: {}
                });

            }
            else if (pwdErr) {
                res.status(409).json({
                    error: true,
                    message: 'please check UserName/password',
                    data: {}
                });

            }
            else {
                res.json({error: false, message:'Login successful', description: [], data: {}});
            }
        });

    })
    
    .get('/user/:_id', function (req, res, next) {
        userServices.getUserById(req, function (err, result) {
            if (err) {
                next(err, req, res, next);
            } else {
                var response = result != null ? {
                    error: false,
                    message: message.GET_RECORD,
                    description: [],
                    data: result
                } : {error: true, message: message.RECORD_ERROR, description: [message.NO_RECORD], data: {}};

            }
            res.json(response);
        });
    })

    .get('/allUsers', function (req, res, next) {

        userServices.getUsers(req, function (err, result) {
            if (err) {
                next(err, req, res, next);
            }
            else if (result && result.length > 0) {
                res.json({
                    error: false,
                    message: message.GET_ALL_RECORDS,
                    description: [],
                    data: result
                });
            }
            else {
                res.status(400).json({
                    error: true,
                    message: message.RECORD_ERROR,
                    description: [message.NO_RECORD],
                    data: []
                });
            }

        });
    });


module.exports = router;
