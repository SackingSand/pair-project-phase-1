const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/ownerController.js');

router.get('/', OwnerController.ownersOnly,OwnerController.ownerPage);
router.get('/list', OwnerController.ownersOnly, OwnerController.showOwnedSites);
router.get('/list/request/:id', OwnerController.ownersOnly, OwnerController.showRequestList);
router.get('/request/:hunt_id/:site_id/accept', OwnerController.ownersOnly, OwnerController.acceptRequest);
router.get('/request/:hunt_id/:site_id/reject', OwnerController.ownersOnly, OwnerController.rejectRequest);
router.get(`/logout`, OwnerController.ownersOnly, OwnerController.logout)



module.exports = router;
