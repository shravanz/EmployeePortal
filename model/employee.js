/**
 * Created by shravan on 28/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
var uniqueValidator = require('mongoose-unique-validator');

//========================EmployeeModule Schema=================================
var employeeSchema = new Schema({

    role: {type: Schema.ObjectId, ref: 'role', required: true},

    firstName: {
        type: String,
        required: [true, 'please enter firstName']
    },
    lastName: {
        type: String,
        required: [true, 'please enter lastName']
    },
    DOB: {
        type: String,
        required: [true, 'please enter DOB']
    },
    email: {
        type: String,
        required: [true, 'please enter email']
    },
    address: {
        type: String,
        required: [true, 'please enter address']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'please enter phoneNumber']
    },
    isActive: {type: Boolean, required: true, default: true},
    createdDate: {type: Date, required: true, default: Date.now},
    modifiedDate: {type: Date, required: false}
});
// enables beautifying
employeeSchema.plugin(beautifyUnique);

// validation for uniqueness
employeeSchema.plugin(uniqueValidator);

//exporting User Model
module.exports = mongoose.model('employee', employeeSchema);