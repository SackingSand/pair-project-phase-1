const express = require('express');
const router = express.Router();
const mainRoute = require('./mainRouter.js');
const siteRoute = require('./siteRoute.js');
const ownerRoute = require('./ownerRoute.js');

router.use('/', mainRoute);
router.use('/sites', siteRoute);
router.use('/owners', ownerRoute);

module.exports = router;
