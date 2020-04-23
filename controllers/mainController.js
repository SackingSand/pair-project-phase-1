const transporter = require('../nodemailer.js');

class MainController {
    static button(req,res) {
        res.render('try')
    }

    static sendMail(req, res) {
    
    }
}

module.exports = MainController;
