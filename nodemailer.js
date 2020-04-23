const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'devonte23@ethereal.email',
        pass: 'QgVPwbRhBRtSR8qGcs'
    }
});

module.exports = transporter;
