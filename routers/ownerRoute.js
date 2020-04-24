const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/ownerController.js');

router.get('/',
    (req, res, next) => {
        if(req.session.role!==`owner`){
            res.redirect(`/`)
        }
        next()
    } 
    ,OwnerController.ownerPage);
router.get('/list', OwnerController.showOwnedSites);
router.get('/list/request/:id', OwnerController.showRequestList);
router.get(`/logout`, OwnerController.logout)



module.exports = router;
