const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'excavadm@gmail.com',
    pass: '12345poiuy' // naturally, replace both with your real credentials or an application-specific password
  }
});

module.exports = transporter;
