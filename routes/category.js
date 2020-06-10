const express = require('express');
const controller = require('../controllers/category');
const router = express.Router();

router.get('/root', controller.getRootCategories);
router.get('/:path', controller.getByPath);
router.get('/:id/children', controller.getChildren);
router.post('/', controller.create);

module.exports = router;
