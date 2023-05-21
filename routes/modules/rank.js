const express = require('express');
const router = express.Router();
const rankController = require('../../controllers/rank-controller');

router.get('/weight', rankController.weightRank);
router.get('/waistline', rankController.waistlineRank);

module.exports = router;
