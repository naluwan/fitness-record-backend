const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/record-controller');
const { authenticated } = require('../../middleware/auth');

router.get('/records/:id', authenticated, recordController.editRecord);
router.put('/records/:id', authenticated, recordController.putRecord);
router.post('/records', authenticated, recordController.postRecord);
router.get('/records', recordController.getRecords);

module.exports = router;
