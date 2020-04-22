'use strict';

const router = require(`express`).Router();
const hunterController = require(`../controllers/hunter.js`);
// const systemController = require(`../controllers/system.js`);

router.get (`/`, hunterController.getProfiles);
router.get (`/register/hunter`, hunterController.createHunterForm)
router.post(`/register/hunter`, hunterController.createHunter)


module.exports = router;