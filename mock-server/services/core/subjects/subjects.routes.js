const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
  '/subjects': '/subjects',
  '/subjects/:id': '/subjects/:id',
  '/subjects/:subjectName/:teacherId': '/subjects/:subjectName/:teacherId'
}));

module.exports = router;
