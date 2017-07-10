/**
 * Created by shravan on 28/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
var uniqueValidator = require('mongoose-unique-validator');

//========================UserModule Schema=================================
var userSchema = new Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: [true, 'email already exists'],
        index: true,
        lowercase: true,
        validate: [{
            validator: function (value) {
                return validator.isEmail(value)
            }, msg: 'Invalid email'
        }]
    },
    password: {type: String, required: [true, 'Please enter password']},
    isActive: {type: Boolean, required: true, default: true},
    createdDate: {type: Date, required: true, default: Date.now},
    modifiedDate: {type: Date, required: false}
});

// enables beautifying
userSchema.plugin(beautifyUnique);

// validation for uniqueness
userSchema.plugin(uniqueValidator);

//exporting User Model
module.exports = mongoose.model('User', userSchema);