const nodemailer = require('nodemailer');

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
  to: 'seratusrb@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
