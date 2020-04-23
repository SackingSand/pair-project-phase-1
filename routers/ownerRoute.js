const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/ownerController.js');

router.get('/:id', OwnerController.ownerPage);
router.get('/:id/list', OwnerController.showOwnedSites);



module.exports = router;
