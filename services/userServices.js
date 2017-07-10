/**
 * Created by shravan on 28/6/17.
 */
//=====================Dependencies==============================

var User = require('../model/user');

//=====================Services==================================
exports.addUser = function (req, cb) {

    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function (err, data) {
        if (err) {
            return cb(err, data)
        }

        return cb(err, {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        });
    });
};

exports.getUsers = function (req, cb) {

    User.find({isActive: true})
        .select({
            '_id': 1,
            'firstName': 1,
            'lastName': 1,
            'email': 1,
            'password': 1
        }).exec(function (err, data) {

        return cb(err, data)
    });
};

exports.login = function (req,cb) {
  //  var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: req.body.email.toLowerCase(), isActive: true}).exec(function (err,user) {
        if (err) {
            return cb(err, null, null, null);
        }
        if (!user) {
            return cb(err, "userErr", null, null)
        }
        else if (user){
            if (user.password != password){
                return cb(null, null, "passwordErr", null);
            }
            else{
                return cb(null, null, null, {
                    _id: user._id,
                    email: user.email
                });
            }

        }
    })
};
exports.getUserById = function (req,cb) {

  User.findById({_id:req.params._id}).lean().exec(function (err,user) {
     return cb(err,{_id: user._id,
                    email: user.email});
  });
};