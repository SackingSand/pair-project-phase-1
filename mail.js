const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "814639109873-ipqo9ns7slcjtenauo2ao87okljpjvt2.apps.googleusercontent.com",
    "n8Pp8ClbbZ00wJu-k01YAHGR",
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04M0zjHVw5qctCgYIARAAGAQSNwF-L9Ired6PDvFUd5rZZVFnL6IG5lCZ7MonwLe6-0JaiiSgh-B1rtoWNQU0nZ7ic3i6Jfg7Bhg"
});
const accessToken = oauth2Client.getAccessToken()


const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "akbarrmdhn96@gmail.com", 
         clientId: "814639109873-ipqo9ns7slcjtenauo2ao87okljpjvt2.apps.googleusercontent.com",
         clientSecret: "n8Pp8ClbbZ00wJu-k01YAHGR",
         refreshToken: "1//04M0zjHVw5qctCgYIARAAGAQSNwF-L9Ired6PDvFUd5rZZVFnL6IG5lCZ7MonwLe6-0JaiiSgh-B1rtoWNQU0nZ7ic3i6Jfg7Bhg",
         accessToken: accessToken
    }
});

const mailOptions = {
    from: "akbarrmdhn96@gmail.com",
    to: "akbarrmdhn94@gmail.com",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: "<b>Hi, this is tes message from from nodejs</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});


