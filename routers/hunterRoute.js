const express = require('express');
const router = express.Router();
const hunterController = require(`../controllers/hunterController.js`);


router.get (`/`, hunterController.huntersOnly, hunterController.getProfiles);
router.get('/request',  hunterController.showRequest);
router.get('/request/:id/accept', hunterController.acceptRequest);
router.get('/request/:id/reject', hunterController.rejectRequest);
router.get (`/edit`, hunterController.huntersOnly, hunterController.editHunterForm)
router.post(`/edit`, hunterController.huntersOnly, hunterController.updateHunter)
router.get (`/logout`, hunterController.huntersOnly, hunterController.logout)
router.post(`/logout`, hunterController.logout);
router.get(`/sitelist`, hunterController.huntersOnly, hunterController.openList);
router.get(`/sitelist/apply/:id`, hunterController.huntersOnly, hunterController.createRequest);


module.exports = router;
