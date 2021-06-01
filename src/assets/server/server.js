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
    console.log(req.body);
    res.status(200).send({ message: "Registration Data Received!" });
    let { email, password, username, firstName, lastName, userRole } = req.body;

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
                            }
                        });
                    }
                });
            } catch (error) {
                res.send({ status: 0, error: error });
            }
        }
    });
});

//Server Access Point.
app.listen(PORT, function () {
    console.log("Server is running on localhost:" + PORT);
})