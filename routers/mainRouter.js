const express = require('express');
const router = express.Router();
const MainController = require('../controllers/mainController.js');
const OwnerController = require('../controllers/ownerController.js');
const hunterController = require(`../controllers/hunterController.js`);

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

// router.get(`/login/owner`, .)

router.get (`/login/hunter`, hunterController.loginHunterForm)
router.post(`/login/hunter`, hunterController.loginHunter)
router.get (`/register/hunter`, hunterController.createHunterForm)
router.post(`/register/hunter`, hunterController.createHunter)

router.get (`/login/owner`, OwnerController.loginOwnerForm)
router.post(`/login/owner`, OwnerController.loginOwner)
// router.get (`/register/owner`, OwnerController.createOwnerForm)
// router.post(`/register/owner`, OwnerController.createOwner)

module.exports = router;
