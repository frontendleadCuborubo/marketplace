const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();
const passport = require('passport');

router.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	controller.getUser
);

router.post(
	'/me',
	passport.authenticate('jwt', { session: false }),
	controller.updateUser
);

module.exports = router;
