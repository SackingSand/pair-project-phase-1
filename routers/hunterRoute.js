const express = require('express');
const router = express.Router();
const hunterController = require(`../controllers/hunterController.js`);


router.get (`/`,
(req, res, next) => {
       if(req.session.role!==`hunter`){
           res.redirect(`/`);
       }
    next()
} 
,hunterController.getProfiles);
router.post(`/logout`, hunterController.logout);
router.get('/request', hunterController.showRequest);
router.get('/request/:id/accept', hunterController.acceptRequest);
router.get('/request/:id/reject', hunterController.rejectRequest);


module.exports = router;
