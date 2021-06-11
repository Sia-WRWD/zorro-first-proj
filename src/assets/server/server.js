var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var md5 = require('md5');
var mysql = require('mysql');
var PORT = process.env.PORT || 3000;
var pool = mysql.createPool
    ({
        connectionLimit: 10,
        host: "localhost",
        user: "testing",
        password: "Ilovedonuts123",
        database: "test"
    });

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cors());

//Check if Server is Operational.
app.get('/', function (req, res) {
    res.send('Server is Functional!');
})

//Fetch Admin Data.
app.get('/fetchAD', function (req, res) {

    pool.getConnection(function (err, connection) {
        console.log("Connected to Database.");
        connection.query("SELECT * FROM admin", function (err, result, rows) {
            connection.release();
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
    });
});

//Fetch User Data.
app.get('/fetchUD', function (req, res) {

    pool.getConnection(function (err, connection) {
        console.log("Connected to Database.");
        connection.query("SELECT * FROM user", function (err, result, rows) {
            connection.release();
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
    });
});

//Register Users
app.post('/registration', async function (req, res, next) {
    res.status(200).send({ message: "Registration Data Received!" });
    let { email, password, username, firstName, lastName, userRole } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (userRole == "Admin") {
            try {
                const hashed_password = md5(password.toString())
                const checkAdminUsername = `SELECT admin_username FROM admin WHERE admin_username = ?`;
                const timecreated = "2021-05-31 13:18:00";
                connection.query(checkAdminUsername, [username], function (err, result, fields) {
                    if (!result.length) {
                        const InsertAdminInfo = `INSERT INTO admin (admin_username, admin_password, admin_email, admin_firstname, admin_lastname, admin_timecreated) VALUES (?, ?, ?, ?, ?, ?)`;
                        connection.query(InsertAdminInfo, [username, hashed_password, email, firstName, lastName, timecreated], (err, result, fields) => {
                            if (err) {
                                res.send({ status: 0, data: err });
                            } else {
                                connection.release();
                                console.log("Successfully Registered New Admin Account!");
                            }
                        });
                    } else {
                        connection.release();
                        console.log("Admin with this Username already Exist!"); 
                        res.send({ data: error })
                    }
                });
            } catch (error) {
                res.send({ status: 0, error: error });
            }
        } else {
            try {
                const hashed_password = md5(password.toString())
                const checkUserUsername = `SELECT user_username FROM user WHERE user_username = ?`;
                const timecreated = "2021-05-31 13:18:00";
                connection.query(checkUserUsername, [username], (err, result, fields) => {
                    if (!result.length) {
                        const InsertUserInfo = `INSERT INTO user (user_username, user_password, user_email, user_firstname, user_lastname, user_timecreated) VALUES (?, ?, ?, ?, ?, ?)`;
                        connection.query(InsertUserInfo, [username, hashed_password, email, firstName, lastName, timecreated], function (err, result, fields) {
                            connection.release();
                            if (err) {
                                res.send({ status: 0, data: err });
                            } else {
                                console.log("Successfully Registered New User Account!");
                                res.send({ data: error })   
                            }
                        });
                    } else {
                        connection.release();
                        console.log("User with this Username already Exist!"); 
                        res.send({ data: err })
                    }
                });
            } catch (error) {
                res.send({ status: 0, error: error });
            }
        }
    });
});

//Delete Users 
app.post('/DeleteUserData', async function (req, res, next) {

    console.log(req.body);
    res.status(200).send({ message: "Delete Data Received! "});

    pool.getConnection(function (err, connection) {
        if (err) throw err
        var userID = req.body.user_id;
        const delUserData = `DELETE FROM user WHERE user_id = ?`;

        connection.query(delUserData, [userID], (err, result, fields) => {
            connection.release();
            if (err) {
                res.send({ status: 0, data: err });
            } else {
                console.log("Successfully Deleted User!")
            }
        });
    });
});

//Forgot Password
app.post('/updateForgotPwd', async function(req, res, next) {
    res.status(200).send({ message: "Forgot Password Data Received!" });
    let { email, username, password } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (err) throw err
        const CheckUsernameExist = `SELECT user_username FROM user WHERE user_username = ?`
        const HashedPwd = md5(password.toString());

        connection.query(CheckUsernameExist, [username], (err, result, fields) => {
            if (result.length == 1) {
                const UpdateForgotPwd = `UPDATE user SET user_password = ? WHERE user_username = ? AND user_email = ?`
                connection.query(UpdateForgotPwd, [HashedPwd, username, email], function (err, result, fields) {
                    connection.release();
                    if (err) {
                        res.send({ status: 0, data: err });
                    } else {
                        console.log("Successfully Updated Password");
                    }
                });
            } else if (!result.length) {
                 console.log("No Such Username Exist, Please Try Again!");
            }
        });
    });
});

//Verify Login Info 
app.post('/verifyLogin', async function(req, res, next) {
    res.status(200).send({ message: "Login Data Received!" });
    let { username, password } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        HashedPassword = md5(password.toString());
        const VerifyLoginInfo = `SELECT user_username AND user_password FROM user WHERE user_username = ? AND user_password = ?`;
        
        connection.query(VerifyLoginInfo, [username, HashedPassword], (err, result, fields) => {
            if (result.length == 1) {
                connection.release();
                if (err) {
                    res.send({ status: 0, data: err });
                } else {
                    console.log("Information Provided is True!");
                }
            } else if (!result.length) {
                console.log('Information Provided is False, Please Try Again')
            }
        });
    });
});


//Server Access Point.
app.listen(PORT, function () {
    console.log("Server is running on localhost:" + PORT);
})