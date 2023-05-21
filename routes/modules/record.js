const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/record-controller');
const { authenticated } = require('../../middleware/auth');

router.get('/:id/edit', authenticated, recordController.editRecord);
router.put('/:id', authenticated, recordController.putRecord);
router.delete('/:id', authenticated, recordController.deleteRecord);
router.post('/', authenticated, recordController.postRecord);
router.get('/', recordController.getRecords);

module.exports = router;
