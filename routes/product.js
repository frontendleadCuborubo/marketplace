const express = require('express');
const passport = require('passport');
const controller = require('../controllers/product');
const router = express.Router();

// router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', controller.getById);
router.get('/:id/collection', controller.getProductCollection);
// router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	controller.create
); //  upload.single('image'),
// router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)

module.exports = router;
