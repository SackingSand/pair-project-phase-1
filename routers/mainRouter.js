const express = require('express');
const router = express.Router();
const MainController = require('../controllers/mainController.js');

router.get('/', MainController.button)
router.post('/', MainController.sendMail)

module.exports = router;
