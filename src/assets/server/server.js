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
    res.status(200).send({ message: "Delete Data Received! " });

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
app.post('/updateForgotPwd', async function (req, res, next) {
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
app.post('/verifyLogin', async function (req, res, next) {
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
                    res.send({ result });
                }
            } else if (!result.length) {
                console.log('Information Provided is False, Please Try Again');
            }
        });
    });
});

//Update Admin Data
app.post('/upAdminData', async function (req, res, next) {
    res.status(200).send({ message: "Update Admin Data Received" });
    let { old_email, up_email, firstName, lastName } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const VerifyAdminAcc = `SELECT admin_email FROM admin WHERE admin_email = ?`;
        const VerifyNewAdminEmail = `SELECT admin_email FROM admin WHERE admin_email = ?`;
        const UpdateAdminInfo = `UPDATE admin SET admin_email = ?, admin_firstname = ?, admin_lastname = ?
                                 WHERE admin_email = ?`;

        connection.query(VerifyAdminAcc, [old_email], (err, result, fields) => {
            if (!result.length) {
                connection.release();
                console.log("Admin Account with the email provided don't exist!");
            } else if (result.length == 1) {
                if (old_email == up_email) {
                    connection.query(UpdateAdminInfo, [up_email, firstName, lastName, old_email], (err, result, fields) => {
                        if (err) throw err;
                        connection.release();
                        if (!result.affectedRows) {
                            console.log("Some Error has Occured, Please Try Again!");
                        } if (result.affectedRows == 1) {
                            console.log("Successfully Updated Admin's Account's Info!");
                        }
                    });
                } else {
                    connection.query(VerifyNewAdminEmail, [up_email], (err, result, fields) => {
                        if (result.length == 1) {
                            connection.release();
                            console.log("An Admin Account with this email already exist, Please Try Again!");
                        } else if (!result.length) {
                            connection.query(UpdateAdminInfo, [up_email, firstName, lastName, old_email], (err, result, fields) => {
                                if (err) throw err;
                                connection.release();
                                if (!result.affectedRows) {
                                    console.log("Some Error has Occured, Please Try Again!");
                                } if (result.affectedRows == 1) {
                                    console.log("Successfully Updated Admin's Account's Info!");
                                }
                            });
                        }
                    });
                }
            }
        });
    });
});

//Delete Admin Data
app.post('/delAdminData', async function(req, res, next) {
    res.status(200).send({ message: "Delete Admin Data Received!" });
    let { email, username } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const VerifyAccountExist = `SELECT admin_email AND admin_username FROM admin WHERE admin_email = ? AND admin_username = ?`;
        const DeleteAccount = `DELETE FROM admin WHERE admin_email = ? AND admin_username = ?`;

        connection.query(VerifyAccountExist, [email, username], (err, result, fields) => {
            if(!result.length) {
                connection.release();
                console.log("An Admin Account with the email or username provided don't exist, Please Try Again!");
            } else if (result.length == 1) {
                connection.query(DeleteAccount, [email, username], (err, result, fields) => {
                    connection.release();
                    if (err) throw err;
                    console.log("Successfully Delete Admin Account!");
                });
            }
        });
    });
});

//Update User Data
app.post('/upUserData', async function (req, res, next) {
    res.status(200).send({ message: "Update User Data Received" });
    let { old_email, up_email, firstName, lastName } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const VerifyUserAcc = `SELECT user_email FROM user WHERE user_email = ?`;
        const VerifyNewUserEmail = `SELECT user_email FROM user WHERE user_email = ?`;
        const UpdateUserInfo = `UPDATE user SET user_email = ?, user_firstname = ?, user_lastname = ?
                                 WHERE user_email = ?`;

        connection.query(VerifyUserAcc, [old_email], (err, result, fields) => {
            if (!result.length) {
                connection.release();
                console.log("User Account with the email provided don't exist!");
            } else if (result.length == 1) {
                if (old_email == up_email) {
                    connection.query(UpdateUserInfo, [up_email, firstName, lastName, old_email], (err, result, fields) => {
                        if (err) throw err;
                        connection.release();
                        if (!result.affectedRows) {
                            console.log("Some Error has Occured, Please Try Again!");
                        } if (result.affectedRows == 1) {
                            console.log("Successfully Updated User's Account's Info!");
                        }
                    });
                } else {
                    connection.query(VerifyNewUserEmail, [up_email], (err, result, fields) => {
                        if (result.length == 1) {
                            connection.release();
                            console.log("An User Account with this email already exist, Please Try Again!");
                        } else if (!result.length) {
                            connection.query(UpdateUserInfo, [up_email, firstName, lastName, old_email], (err, result, fields) => {
                                if (err) throw err;
                                connection.release();
                                if (!result.affectedRows) {
                                    console.log("Some Error has Occured, Please Try Again!");
                                } if (result.affectedRows == 1) {
                                    console.log("Successfully Updated User's Account's Info!");
                                }
                            });
                        }
                    });
                }
            }
        });
    });
});

//Delete User Data
app.post('/delUserData', async function(req, res, next) {
    res.status(200).send({ message: "Delete User Data Received!" });
    let { email, username } = req.body;
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const VerifyAccountExist = `SELECT user_email AND user_username FROM user WHERE user_email = ? AND user_username = ?`;
        const DeleteAccount = `DELETE FROM user WHERE user_email = ? AND user_username = ?`;

        connection.query(VerifyAccountExist, [email, username], (err, result, fields) => {
            if(!result.length) {
                connection.release();
                console.log("A User Account with the email or username provided don't exist, Please Try Again!");
            } else if (result.length == 1) {
                connection.query(DeleteAccount, [email, username], (err, result, fields) => {
                    connection.release();
                    if (err) throw err;
                    console.log("Successfully Delete User Account!");
                });
            }
        });
    });
});

//Server Access Point.
app.listen(PORT, function () {
    console.log("Server is running on localhost:" + PORT);
})