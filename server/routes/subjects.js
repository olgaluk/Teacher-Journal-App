const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.subjects_info_get);

module.exports = router;
