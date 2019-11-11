const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
  '/students': '/students',
  '/students/:subjectId/:teacherId': '/students/:subjectId/:teacherId'
}));

module.exports = router;
