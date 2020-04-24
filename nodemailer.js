const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'excavadm@gmail.com',
    pass: '12345poiuy' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'excavadm@gmail.com',
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
