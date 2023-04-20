const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/record-controller');
const { authenticated } = require('../../middleware/auth');

router.get('/records/:id/edit', authenticated, recordController.editRecord);
router.put('/records/:id', authenticated, recordController.putRecord);
router.delete('/records/:id', authenticated, recordController.deleteRecord);
router.post('/records', authenticated, recordController.postRecord);
router.get('/records', recordController.getRecords);

module.exports = router;
