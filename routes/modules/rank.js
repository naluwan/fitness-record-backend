const express = require('express');
const router = express.Router();
const rankController = require('../../controllers/rank-controller');

router.get('/weight', rankController.weightRank);

module.exports = router;
