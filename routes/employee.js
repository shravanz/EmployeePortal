/**
 * Created by shravan on 28/6/17.
 */
//==========Dependencies==============================
var express = require('express');
var router = express.Router();
var employeeServices = require('../services/employeeServices');
var message = require('../handlers/msg_handler');

//==========Controllers================================
router
    .post('/addEmployee', function (req, res, next) {

        employeeServices.addEmployee(req, function (err, result) {
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

    .get('/employee/:_id', function (req, res, next) {
        employeeServices.getEmployeeById(req, function (err, result) {
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

    .get('/allEmployee', function (req, res, next) {

        employeeServices.getEmployee(req, function (err, result) {
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
    .get('/count', function (req, res, next) {
        employeeServices.countRole(req, function (err, result) {
            if (err) {
                next(err, req, res, next);
            } else if (result && result.length > 0) {
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

    .delete('/employee/:_id', function (req, res, next) {

        employeeServices.removeEmployeeById(req, function (err, result) {

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