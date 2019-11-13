const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.students_info_get)
  .post('/', studentController.student_create_post);
router.get('/teacher', studentController.students_by_teacher_get);

module.exports = router;
