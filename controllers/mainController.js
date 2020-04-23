const transporter = require('../nodemailer.js');

class MainController {
    
    static home(req,res) {
        res.render('index')
    }

    static sendMail(req, res) {
    
    }

    static ownerLoginForm (req, res) {
    
    }
    static hunterLoginForm (req, res) {
    
    }
}

module.exports = MainController;
