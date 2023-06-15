const express = require('express');
const router = express.Router();
const sportCategoryController = require('../../controllers/sportCategory-controller');

router.get('/', sportCategoryController.getAllCategories);

module.exports = router;
