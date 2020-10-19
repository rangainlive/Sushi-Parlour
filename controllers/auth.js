const mysql = require('mysql');
var nodemailer = require('nodemailer');
var validator = require('validator');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "", //Enter user Email
        pass: "" //Enter Email Password 
    },
    tls: {
        rejectUnauthorized: false
    }
});


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.index = (req, res) => {
    console.log(req.body);
    const { persons, date, time, name, email, phone} = req.body;
    var mailOptions = {
        from: '', //Enter User Email
        to: email,
        subject: 'Booking Confirmation: Sushi Parlour',
        html: '<h1>Happy Welcome</h1><p>your seat confirmed in Sushi Parlour</p>'
    };
    if(validator.isEmpty(persons) || validator.isEmpty(date) || validator.isEmpty(time) || validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(phone)){
        message: 'Fill all the fields to book your seat'
    }
    else {
        if(!(validator.isEmail(email))){
            message: 'invalid Email address..'
        }
        if(!(validator.isMobilePhone(phone))){
            message: 'invalid Mobile Number...'
        }
        else {
            db.query('INSERT INTO booking SET ?', { persons: persons, date: date, time: time, name: name, email: email, phone: phone}, (error, results) => {
                if(error) {
                    console.log(error);
                }
                else {
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent:' + info.response);
                        }
                    });
                    console.log(results);
                    return res.render('index', {
                        message: 'Seat Booked..'
                    });
                }
            });
        }
    }
   
}