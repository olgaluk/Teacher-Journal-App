const express = require('express');
const router = express.Router();

module.exports = (server) => {

  router.get('/subjects', (req, res) => {
    let subjects = server.db.getState().subjects;
    res.json(subjects);
  });

  router.get('/subjects/:id', (req, res) => {
    const subjectName = req.params.id;
    const subjects = server.db.getState().subjects;
    const subject = subjects
      .find(subject => subject.name === subjectName);
    res.json(subject);
  });

  router.delete('/subjects/:subjectId/:teacherId', (req, res) => {
    const { subjectId, teacherId } = req.params;
    const subjects = server.db.get('subjects');
  })

  return router;
};
