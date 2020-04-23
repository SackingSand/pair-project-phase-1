const express = require('express');
const router = express.Router();
const hunterController = require(`../controllers/hunter.js`);


router.get (`/`, hunterController.getProfiles);
router.get (`/register/hunter`, hunterController.createHunterForm)
router.post(`/register/hunter`, hunterController.createHunter)


module.exports = router;
