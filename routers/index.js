const express = require('express');
const router = express.Router();
const mainRoute = require('./mainRouter.js');
const siteRoute = require('./siteRoute.js');
const ownerRoute = require('./ownerRoute.js');
const hunterRoute = require(`./hunterRoute.js`)

// router.use('/', mainRoute);
router.use('/', mainRoute);
router.use('/sites', siteRoute);
router.use('/owners', ownerRoute);
router.use('/hunters', hunterRoute);

module.exports = router;