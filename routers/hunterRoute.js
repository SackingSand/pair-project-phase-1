const express = require('express');
const router = express.Router();
const hunterController = require(`../controllers/hunterController.js`);


router.get (`/`, hunterController.getProfiles);
router.get (`/register`, hunterController.createHunterForm)
router.post(`/register`, hunterController.createHunter)


module.exports = router;
