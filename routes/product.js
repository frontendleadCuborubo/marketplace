const express = require('express');
const passport = require('passport');
const controller = require('../controllers/product');
const router = express.Router();

router.get('/:id', controller.getById);
router.get('/:id/collection', controller.getProductCollection);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	controller.create
);

module.exports = router;
