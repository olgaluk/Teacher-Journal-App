const fs = require('fs');
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

  router.put('/subjects', (req, res) => {
    const params = {};
    req.body.params.updates
      .forEach(item => { params[item.param] = item.value });
    const { subjectId, teacherId, newTeacherId } = params;
    let subjects = server.db.getState().subjects;
    subjects = subjects.map(subject => {
      if (subject.id === +subjectId) {
        const teacherIndex = subject.teachersID.indexOf(+teacherId);
        subject.teachersID.splice(teacherIndex, 1, +newTeacherId);
      }
      return subject;
    });

    fs.writeFile("./services/core/subjects/subjects.db.json",
      JSON.stringify({ "subjects": subjects }, 0, 2),
      function (error) {
        if (error) throw error;
        res.status(200).json(null);
      });
  });

  return router;
};
