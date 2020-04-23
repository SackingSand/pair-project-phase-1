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
router.get (`/edit`, hunterController.huntersOnly, hunterController.editHunterForm)
router.post(`/edit`, hunterController.huntersOnly, hunterController.updateHunter)
router.get(`/logout`, hunterController.logout)


module.exports = router;
