/**
 * Created by ankit kumar on 7/7/16.
 */

var async = require('async');
var sendResponse = require('./sendResponse.js');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var commonfunction = require('./commonfunction.js');
var validator = require('validator');
const saltRounds = 10;




/*
* ===============
*  sign up
* */


exports.register = function (request, reply) {
    var email;
    var name;
    var password;
    var phone_no;
    var city;
    var state;
    var country;
    var status;

    async.auto({
        checkBlank: function (callback) {

            if (!request.body.email) {
                var msg = "Please enter email or enter valid email above";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }
            if(validator.isEmail(request.body.email)==false)
            {
                var msg = "Please enter valid email";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }
            if (!request.body.name) {
                var msg = "Please enter name ";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }

            if (!request.body.password) {
                var msg = "Please enter password ";
                return  sendResponse.parameterMissingError(msg, 400, reply);
            }

            if (!request.body.phone_no) {
                var msg = "Please enter phone number ";
                return  sendResponse.parameterMissingError(msg, 400, reply);
            }

            if (!request.body.city) {
                var msg = "Please enter city ";
                return  sendResponse.parameterMissingError(msg, 400, reply);
            }
            if (!request.body.state) {
                var msg = "Please enter state ";
                return  sendResponse.parameterMissingError(msg, 400, reply);
            }
            if (!request.body.country) {
                var msg = "Please enter country ";
                return  sendResponse.parameterMissingError(msg, 400, reply);
            }



            email = request.body.email;
            name = request.body.name;
            password = request.body.password;
            phone_no=request.body.phone_no;
            city = request.body.city;
            state = request.body.state;
            country = request.body.country;


            callback(null);
            ///////
        },
       checkUserExist: ['checkBlank', function (callback, result) {
            console.log(".......checkUserExist")
            var sql = " select * from users where email= ? "
            connection.query(sql, [email], function (err, result) {
                if (err)
                    callback(err);
                else {
                    if (result.length > 0) {
                        var msg = " email already exist";
                        sendResponse.sendErrorMessage(msg, reply, 500);
                    }
                    else {
                        callback(null);
                    }
                }
            })
        }],
       /* checkUsername : ['checkUserExist',function(callback,result)
        {
            console.log("....checkUsername.............")
            var sql = " select * from users where username = ? "
            connection.query(sql, [username], function (err, result) {
                if (err)
                {   console.log(err);
                    callback(err);
                }
                else {
                    if (result.length > 0) {
                        var msg = " username already exist";
                        sendResponse.sendErrorMessage(msg, reply, 500);
                    }
                    else {
                        callback(null);
                    }
                }
            })

        }],

        genrateAccessToken: ['checkUsername', function (callback, resukt) {

            jwt.sign({email: email}, 'hairfyx' ,{}, function (err, token) {
                console.log("here");
               if(err)
                   callback(err);
                else
               {    accessToken=token;
                   callback(null);
               }

            });
        }],*/
        storeData: ['checkUserExist', function (callback, result) {

            console.log(phone_no);
            var sql = " INSERT INTO `suppliers` (`email`, `name`, `password`, `phone_no`, `city`, `state`, `country` ) values(?,?,?,?,?,?,?) ";
            console.log(phone_no);
            connection.query(sql, [email, name, password, phone_no, city, state, country], function (err, result) {

                if (err) {
                    console.log(err);
                    callback(err);
                }
                else {
                    callback(null);
                    console.log(result);
                }
            })
        }]
    }, function (err, result) {
        if (err) {
            var msg = err.toString();
            sendResponse.sendErrorMessage(msg, reply, 500);
        }
        else
        {
            var msg="Signup successful!" ;
            sendResponse.sendSuccessMessage(msg,reply,200);
        }
    })

}


exports.authenticate= function (request,reply) {

    var email;
    var password;
    var label;
    async.auto({
        checkBlank: function (callback) {

            if (!request.body.email) {
                var msg = "Please enter email or enter valid email below";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }
            if (validator.isEmail(request.body.email) == false) {
                var msg = "Please enter valid email";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }
            email = request.body.email;
            password = request.body.password;
            label = request.body.label;
            callback(null);
        },

        give_authorisation: ['checkBlank', function (callback, result) {

            if (email == "abc@gmail.com" && password == "123") {
                console.log("logged in");
                var msg = "Authenticated";
                sendResponse.sendSuccessMessage(msg, reply, 200);
            }
            else {
                console.log("not valid");
                console.log(email,password);
                var msg = "NOT VALID";
                sendResponse.sendSuccessMessage(msg, reply, 500);
            }


        }]
    /*},
        function (err, result) {
            if (err) {
                var msg = err.toString();
                sendResponse.sendErrorMessage(msg, reply, 500);
            }
            else
            {
                var msg="User Logged in" ;
                sendResponse.sendSuccessMessage(msg,reply,200);
            }*/
        })



}



exports.login = function (request, reply) {
    var email;
    var password;
    var logged = 0;


    async.auto({
        checkBlank: function (callback) {

            if (!request.body.email) {
                var msg = "Please enter email or enter valid email";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }

            if (!request.body.password) {
                var msg = "Please enter password ";
                console.log(request.body.password);
                return  sendResponse.parameterMissingError(msg, 400, reply);
            }

            email = request.body.email;
            password = request.body.password;

            callback(null);
        },

        checkUserExist: ['checkBlank', function (callback, result) {
            console.log(".......checkUserExist")
            var sql = " select * from users where email= ? and password = ?";
            connection.query(sql, [email, password], function (err, result) {
                if (err)
                    callback(err);
                else {
                    if (result.length > 0) {
                        console.log(result);
                        logged = 1;
                        callback(null);
                    }
                    else {
                        var msg = "no such user exists";
                        sendResponse.sendErrorMessage(msg, reply, 500);
                    }
                }
            })
        }],



    }, function (err, result) {
        if (err) {
            var msg = err.toString();
            sendResponse.sendErrorMessage(msg, reply, 500);
        }
        else
        {
            var msg="User Logged in" ;
            sendResponse.sendSuccessMessage(msg,reply,200);
        }
    })

}


exports.login_waterfall = function (request,reply) {

    var logged = 0;
    var email;
    var password;

    async.waterfall([function (callback) {


            if (!request.body.email) {
                var msg = "Please enter email or enter valid email";
                return sendResponse.parameterMissingError(msg, 400, reply);
            }

            if (!request.body.password) {
                var msg = "Please enter password ";
                console.log(request.body.password);
                return sendResponse.parameterMissingError(msg, 400, reply);
            }

            email = request.body.email;
            password = request.body.password;


            console.log(email,password);
            callback(null,"no missing value");

    },

        function  (reply,callback) {


            console.log(".......checkUserExist.........")
            var sql = " select * from admin where email= ? and password = ?";
            connection.query(sql, [email, password], function (err, result) {

                if (err)
                    callback(err);
                else {


                    if (result.length > 0) {
                      //  console.log(result);
                        logged = 1;



                        callback(null);
                    }
                    else {
                        /*var msg = "no such user exists";
                        sendResponse.sendErrorMessage(msg, reply, 500);*/

                        err="not found";
                        callback(err);
                    }


                }
            });


        }],function (err, result) {
        if (err) {

            var msg = err.toString();
            sendResponse.sendErrorMessage(msg, reply, 500);
        }
        else
        {

            var msg="User Logged in" ;
            console.log(msg);
            sendResponse.sendSuccessMessage(msg,reply,200);
        }
    });


}

exports.show = function (request, reply) {

    var data;
    async.waterfall([function (callback) {


        console.log(".......showing.........")
        var sql=" SELECT id , name FROM suppliers WHERE status=0 ";
        connection.query(sql, function (err, result) {
            if(err)
                callback(err);
            else
            {
                if(result.length>0)
                {
                    data=result;
                    console.log("here2");
                    console.log(result,data);
                }
            }
            callback(null);
        })


    }],function (err, result) {
        if (err) {

            var msg = err.toString();
            sendResponse.sendErrorMessage(msg, reply, 500);
        }
        else
        {

            console.log("here");
            console.log(data);
            sendResponse.sendSuccessMessage(data,reply,200);
        }



});


}







/*




storeData: ['checkUsername', function (callback, result) {
    var sql = " insert into users(email,name,access_token,password,username,dob,street_address,marital_status,is_stylist,city,state,country,device_token_android,device_token_ios) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
    connection.query(sql, [email, name,Math.random(), password, username, dob, streetAddress, maritalStatus, is_stylist, city, state, country,deviceTokenAndroid,deviceTokenIos], function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null);
            console.log(result);
        }
    })
}]
}, function (err, result) {
    if (err) {
        var msg = err.toString();
        sendResponse.sendErrorMessage(msg, reply, 500);
    }
    else
    {
        var msg="Signup successful!" ;
        sendResponse.sendSuccessMessage(msg,reply,200);
    }
})

}
*/