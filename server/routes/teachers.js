const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.teachers_info_get);

module.exports = router;
