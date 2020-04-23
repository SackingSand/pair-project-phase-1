const express = require('express');
const router = express.Router();
const SiteController = require('../controllers/siteController.js');

router.get('/', SiteController.showAllSites);
router.get('/add/:id', SiteController.showAddSiteForm);
router.post('/add/:id', SiteController.addNewSite);
router.get('/edit/:id', SiteController.showEditSiteForm);
router.post('/edit/:id', SiteController.editSite);
router.get('/delete/:id', SiteController.deleteSite);

module.exports = router;
