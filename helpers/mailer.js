'use strict'

const nodemailer = require('nodemailer');

function sendMail (target, subject, message){

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'twila58@ethereal.email',
            pass: 'nyzmSbNhAuuMDFFEhP'
        }
    });
    
    const mailOptions = {
        from: 'twila58@ethereal.email',
        to: target,
        subject: subject,
        text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

}

module.exports = sendMail;
