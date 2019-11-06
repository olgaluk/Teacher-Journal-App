const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
  '/students': '/students',
  '/students/:id': '/students/:id',
}));

module.exports = router;
