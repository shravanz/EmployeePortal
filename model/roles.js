/**
 * Created by shravan on 28/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
var uniqueValidator = require('mongoose-unique-validator');

//========================roleModule Schema=================================
var roleSchema = new Schema({
    roleCode: {
        type: String,
        unique: [true, 'email already exists'],
        required: [true, 'Please enter roleCode']
    },
    roleName: {
        type: String,
        required: [true, 'please enter roleName']
    },
    roleDescription: {
        type: String,
        required: false
    },
    isActive: {type: Boolean, required: true, default: true},
    createdDate: {type: Date, required: true, default: Date.now},
    modifiedDate: {type: Date, required: false}
});
// enables beautifying
roleSchema.plugin(beautifyUnique);

// validation for uniqueness
roleSchema.plugin(uniqueValidator);

//exporting User Model
module.exports = mongoose.model('role', roleSchema);
