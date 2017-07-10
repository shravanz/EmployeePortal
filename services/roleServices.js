/**
 * Created by shravan on 28/6/17.
 */
//=====================Dependencies==============================

var Role = require('../model/roles');
var mongoose = require('mongoose');
var Employee = require('../model/employee');

//=====================Services==================================

exports.addRole = function (req, cb) {

    var role = new Role();
    role.roleCode = req.body.roleCode;
    role.roleName = req.body.roleName;
    role.roleDescription = req.body.roleDescription;

    role.save(function (err, data) {
        if (err) {
            return cb(err, data)
        }

        return cb(err, {
            _id: data._id,
            roleName: data.roleName,
            roleCode: data.roleCode,
            roleDescription: data.roleDescription

        });
    });
};

exports.getRoles = function (req, cb) {

    Role.find({isActive: true})
        .select({
            '_id': 1,
            'roleName': 1,
            'roleCode': 1
        }).exec(function (err, data) {

        return cb(err, data)
    });
};

exports.removeRoleById = function (req,cb) {

    Role.findByIdAndUpdate( {_id: req.params._id}, {$set: {isActive: false}},
        function(err, category) {

            return cb(err, category);
        });

};

