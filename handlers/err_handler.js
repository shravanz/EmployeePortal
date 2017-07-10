/**
 * Created by shravan on 28/6/17.
 */
exports.processError = function (err, callback) {

    var response = {};
    var status = err.errorCode || err.status;

    switch (err.name) {

        case "ValidationError":
            status = 500;
            response = {
                error: true,
                message: err.message || "We could not process your request due to validation issues. Please see the description for details!",
                description: checkValidationErrors(err),
                data: []
            };
            break;

        case "CastError":
            status = 400;
            response = {
                error: true,
                message: "We could not process your request due to a bad syntax. PLease see the description for details!",
                description: [err.message],
                data: []
            };
            break;

        case "UnauthorizedError":
            status = 403;
            response = {
                error: true,
                message: "You are not allowed to perform this action",
                description: ["This happens when you do not have enough permissions to perform an action"],
                data: []
            };
            break;

        case "NotFoundError":
            response = {
                error: true,
                message: "We could not find the resource you are looking for",
                description: ["This happens usually when there is no such resource to be served from the server"],
                data: []
            };
            break;

        default:
            status = 500;
            response = {
                error: true,
                message: "Sorry! We are not able to process your request at the moment! Please try again later",
                description: [err.message] || [err],
                data: []
            };
            break;

    }

    callback(status, response);

};

var checkValidationErrors = function (err) {

    if (!(err['name'] != undefined && err['name'] != null && err['name'] === 'ValidationError')) {

        return [];

    } else {

        var errors = err['errors'];
        var messages = [];

        for (key in errors) {

            var message = errors[key]['message'];
            var path = message.replace("Path ", "");
            messages.push(path);

        }

        return messages;

    }

};