/**
 * Created by shravan on 28/6/17.
 */
//==========Dependencies==============================
var express = require('express');
var router = express.Router();
var roleServices = require('../services/roleServices');
var message = require('../handlers/msg_handler');

//==========Controllers================================
router

    .post('/addRole', function (req, res, next) {

        roleServices.addRole(req, function (err, result) {
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

    .get('/allRoles', function (req, res, next) {

        roleServices.getRoles(req, function (err, result) {
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
    })



    .delete('/role/:_id', function (req, res, next) {

        roleServices.removeRoleById(req, function (err, result) {

            if (err) {

                next(err, req, res, next);

            } else {

                if (result != null) {
                    res.json({error: false, message: message.RECORD_DELETED, description: [], data: result});
                }
                else {
                    res.json({error: true, message: message.RECORD_ERROR, description: [message.NO_RECORD], data: {}});
                }
            }

        });

    });


module.exports = router;