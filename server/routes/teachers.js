const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');

router.get('/',
  teacherController.teachers_from_subject_get,
  teacherController.teachers_list_get);
router.get('/id/*', teacherController.teacher_by_id_get);
router.get('/other', teacherController.teachers_from_other_subjects_get);

module.exports = router;
