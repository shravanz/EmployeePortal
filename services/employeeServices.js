/**
 * Created by shravan on 28/6/17.
 */
//=====================Dependencies==============================

var Employee = require('../model/employee');

//=====================Services==================================

exports.addEmployee = function (req, cb) {

    var employee = new Employee();
    employee.role = req.body.role;
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.DOB = req.body.DOB;
    employee.email = req.body.email;
    employee.address = req.body.address;
    employee.phoneNumber = req.body.phoneNumber;



    employee.save(function (err, data) {
        if (err) {
            return cb(err, data)
        }

        return cb(err, {
            _id: data._id,
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
            DOB: data.DOB,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber
        });
    });
};
exports.getEmployee = function (req, cb) {

    Employee.find({isActive: true})
        .select({
            '_id': 1,
            'role': 1,
            'firstName': 1,
            'lastName': 1,
            'DOB': 1,
            'email': 1,
            'address': 1,
            'phoneNumber': 1
        }).exec(function (err,data){

        Employee.populate(data,{path:'role',select:{'_id':1,'roleCode':1,'roleName':1}},function (err,result) {
            return cb(err, result)
        });

    });
};

exports.getEmployeeById = function (req,cb) {

    Employee.findById({_id:req.params._id}).lean().exec(function (err,emp) {
        return cb(err,emp);
    });
};

exports.removeEmployeeById = function (req,cb) {

    Employee.findByIdAndUpdate( {_id: req.params._id}, {$set: {isActive: false}},
        function(err, employee) {

            return cb(err, employee);
        });

};

exports.countRole = function (req,cb) {

    Employee.aggregate(
        [
            { '$match': {
                'isActive': true
            }
            },
            {
                $group : {

                    '_id' : '$role',
                    'count': { $sum: 1 }
                }
            },
            {
                $project: {
                    '_id': 0,
                    'role': '$_id',
                    'totalCount': '$count'
                }
            }
        ],
        function(err,result) {

            Employee.populate( result, { path: "role", select: {
                '_id': 0,
                'roleName': 1,
                'roleCode': 1
            }}, function(err, data) {

                return cb(err, data);
            });

        });
};