const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
  '/teachers': '/teachers',
  '/teacher/:id': '/teacher/:id'
}));

module.exports = router;
