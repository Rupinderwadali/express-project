var sendResponse = require('./sendResponse');
var constant = require('./constant');
var readMultipleFiles = require('read-multiple-files');
var func = require('./commonfunction');
var async = require('async');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var jwt = require('jsonwebtoken');


/*
 * ------------------------------------------------------
 * Authenticate a user through Access token and return id
 * Input:Access token
 * Output: Admin_id Or Json error
 * ------------------------------------------------------
 */


exports.authenticateAccessToken = function(accesstoken, reply, callback) {

    var sql = "select id from users ";
    sql += " where access_token =? limit 1";
    connection.query(sql, [accesstoken], function(err, result) {

        if(err)
            callback(err);
        if (result.length > 0) {
            console.log(result[0].id);
             callback(null, result[0].id);

        } else {
            var msg = " access Token is not valid";
            return sendResponse.sendErrorMessage(msg,reply,400);

        }
    });

}

exports.authenticateFbAccessToken = function(accesstoken, reply, callback) {

    var sql = "select * from users ";
    sql += " where fb_access_token =? limit 1";
    connection.query(sql, [accesstoken], function(err, result) {

        if(err)
            callback(err);
        if (result.length > 0) {
            // console.log(result[0].id);
             callback(null, result[0]);

        } else {
           callback(null,0);

        }
    });

}


exports.authenticateInstaGramAccessToken = function(accesstoken, reply, callback) {

    var sql = "select * from users ";
    sql += " where instagram_access_token =? limit 1";
    connection.query(sql, [accesstoken], function(err, result) {

        if(err)
            callback(err);
        if (result.length > 0) {
            // console.log(result[0].id);
            callback(null, result[0]);

        } else {
            callback(null,0);

        }
    });

}
exports.updateAccessToken = function (data,reply,cb) {
    console.log("...............",data);
    var accessToken ;
    async.auto({
        generateAccessToken:function(callback)
        {
            jwt.sign({email: data.email}, 'hairfyx' ,{}, function (err, token) {
                if(err)
                    callback(err);
                else
                {    accessToken=token;
                    console.log("....access........",accessToken)
                    callback(null);
                }

            });
        },
        updateAccessToken : ['generateAccessToken',function(callback)
        {
            var sql = "update users set access_token = ? where id=? "
            connection.query(sql, [accessToken, data.id], function (err, result) {

                if (err) {
                    console.log(err);
                    var msg =" authentication problem"
                    sendResponse.sendErrorMessage(msg,reply,400);
                }
                else {
                    callback(null);
                }
            })

        }]
    },function(err,result){
        if(err)
            cb(err);
        else
            cb(null,accessToken);
    })

}

/**
 * Upload file to S3 bucket
 * @param file
 * @param folder
 * @param callback
 */

exports.uploadImageFileToS3Bucket = function (res, file, folder, callback) {
    var fs = require('fs');
    var AWS = require('aws-sdk');

    var filename = file.name; // actual filename of file
    var path = file.path; //will be put into a temp directory
    var mimeType = file.type;
    var s3Url = config.get('s3BucketCredentials.s3URL') + '/';

    // console.log("uploadImageFileToS3Bucket....................")
    // console.log(file.name)
    // console.log(file.path)
    // console.log(folder)
    async.waterfall([
        function (cb) {
            console.log("here==========================")
            func.generateRandomString(cb);
        },
        function (randomString, cb) {
            console.log("here")
            var fname = filename.split(".");
            filename = fname[0].replace(/ /g, '') + randomString + "." + fname[1];
            fs.readFile(path, function (error, file_buffer) {
                if (error) {
                    console.log("================s3============error==" + error);
                    sendResponse.somethingWentWrongError(res);
                } else {
                    AWS.config.update({
                        accessKeyId: config.get('s3BucketCredentials.accessKeyId'),
                        secretAccessKey: config.get('s3BucketCredentials.secretAccessKey')
                    });
                    var s3bucket = new AWS.S3();
                    var params = {
                        Bucket: config.get('s3BucketCredentials.bucket'),
                        Key: filename,
                        Body: file_buffer,
                        ACL: 'public-read',
                        ContentType: mimeType
                    };

                    s3bucket.putObject(params, function (err, data) {
                  //      console.log("Uploading image...........................", err, data, null);

                        fs.unlink(path, function (err, result1) {
                        });
                        if (err) {
                            console.log("================s3============error==" + err);
                            sendResponse.somethingWentWrongError(res);
                        } else {

                            return callback(null, s3Url + filename);
                        }
                    });
                }
            });
        }
    ], function (error1, response1) {

    })

};


exports.sendEmail = function (data,reply,callback) {

   // console.log(config.get('EmailCredentials.email'));

    var transporter = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: config.get('EmailCredentials.email'),
            pass: config.get('EmailCredentials.password')
        }
    })
// setup e-mail data with unicode symbols
    var mailOptions = {
        from: config.get('EmailCredentials.email'), // sender address
        to: data[0], // list of receivers
        subject: "New password from HairFyx", // Subject line
        // text:'your password is '+inputArray[1] , // plaintext body
        html: '<h1>your password is ?</h1>' + data[1] // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
            callback
        } else {
           // console.log('Message sent: ' + JSON.stringify(info));
            callback(null);
        }

    });

}



exports.sendMailthroughSMTP = function (res,subject,receiversEmail,content,type,callback) {


    var transporter = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: config.get('EmailCredentials.email'),
            pass: config.get('EmailCredentials.password')
        }
    });
    if(type==0)
    {
        var mailOptions = {
            from: config.get('EmailCredentials.email'), // sender address
            to: receiversEmail, // list of receivers
            subject: subject, // Subject line
            html: content  // plaintext body
        };
    }
    else{
        var mailOptions = {
            from: config.get('EmailCredentials.email'), // sender address
            to: receiversEmail, // list of receivers
            subject: subject, // Subject line
            text: content // plaintext body
        };
    }
// setup e-mail data with unicode symbols


// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("err",error);
            sendResponse.somethingWentWrongError(res);
        } else {
        //    console.log('Message sent: ' + JSON.stringify(info));
            callback(null);
        }

    });

}



 exports.uploadMultipleFilesToS3Bucket = function (bufs,file,count,res,callback)
{
    var fs = require('fs');
    var AWS = require('aws-sdk');
    var fileUrls = []
    for(var i = 0 ; i < count ; i++)
    {
        (function(i)
        {
            var x = func.generateString();
            var filename = file[i].name; // actual filename of file
            var path = file[i].path; //will be put into a temp directory
            var mimeType = file[i].type;
            var s3Url = config.get('s3BucketCredentials.s3URL') + '/';
            var fname = filename.split(".");
            filename = fname[0].replace(/ /g, '') + x + "." + fname[1];


            AWS.config.update({
                accessKeyId: config.get('s3BucketCredentials.accessKeyId'),
                secretAccessKey: config.get('s3BucketCredentials.secretAccessKey')
            });
            var s3bucket = new AWS.S3();
            var params = {
                Bucket: config.get('s3BucketCredentials.bucket'),
                Key: filename,
                Body: bufs[0],
                ACL: 'public-read',
                ContentType: mimeType
            };

            s3bucket.putObject(params, function (err, data) {
                console.log("Uploading image...........................", err, data, null);

                fs.unlink(path, function (err, result1) {
                });
                fileUrls.push(s3Url + filename);
                if(i == count - 1)
                {
                    console.log(fileUrls);
                    callback(null,fileUrls);
                }
            });

        }(i))
    }

}

exports.generateString = function (callback) {
    var generatedText = ""
    var text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (var i = 0; i < 9; i++) {
        (function(i)
        {
            generatedText += text.charAt(Math.floor((Math.random() * text.length)));
            if(i==8)
                callback(null,generatedText);

        })(i);

    }
}
