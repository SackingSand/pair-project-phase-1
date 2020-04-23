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
router.get('/:id/list', OwnerController.showOwnedSites);



module.exports = router;
