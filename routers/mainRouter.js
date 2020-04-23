const express = require('express');
const router = express.Router();
const MainController = require('../controllers/mainController.js');

router.get('/',
(req, res, next) => {
    if(req.session.uid) {
       if(req.session.role===`owner`){
           res.redirect(`/owners`);
       }  else {
           res.redirect(`/hunters`)
       }
    }
    next()
} 
,MainController.home)

router.post('/', MainController.sendMail)

module.exports = router;
