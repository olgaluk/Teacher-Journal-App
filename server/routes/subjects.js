const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.subjects_info_get)
  .post('/', subjectController.subject_create_post);
router.get('/*', subjectController.subject_find_get);

module.exports = router;
