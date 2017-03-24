/**
 * Created by vinay on 3/2/16.
 */
var constant = require('./constant');


exports.invalidAccessTokenError = function (res) {

    var errResponse = {
        status: constant.responseStatus.INVALID_ACCESS_TOKEN,
        message: constant.responseMessage.INVALID_ACCESS_TOKEN,
        data: {}
    }
    sendData(errResponse,res);
};

exports.parameterMissingError = function (msg,status,res) {

    var errResponse = {
        status: status,
        message: msg
    }
    sendData(errResponse,res);
};

exports.somethingWentWrongError = function (res) {

    var errResponse = {
        status: constant.responseStatus.ERROR_IN_EXECUTION,
        message: constant.responseMessage.ERROR_IN_EXECUTION,
        data: {}
    }
    sendData(errResponse,res);
};


exports.sendErrorMessage = function (msg,res,status) {

    var errResponse = {
        status: status,
        message: msg
    };
    sendData(errResponse,res);
};
exports.sendSuccessMessage = function (msg,res,status) {

    var errResponse = {
        status: status,
        message: msg
    };
    sendData(errResponse,res);
};

exports.sendSuccessData = function (data,message,res,status) {

    var successResponse = {
        status: status,
        message: message,
        data: data
    };
    sendData(successResponse,res);
};

exports.sendSuccessDataForApp = function (data,message,res) {

    var successResponse = {
        status: 200,
        message: message,
        data: data
    };
    sendData(successResponse,res);
};





function sendData(data,res)
{
    res.type('json');
    res.jsonp(data);
}