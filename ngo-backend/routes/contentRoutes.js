const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.route('/:key')
    .get(getContent)
    .post(protect, checkPermission('manage_content'), updateContent);

module.exports = router;
