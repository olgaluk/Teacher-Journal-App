const express = require('express');
const router = express.Router();

module.exports = (server) => {

  router.get('/teachers', (req, res) => {
    let { teachersID } = req.query;
    teachersID = teachersID
      .split(',')
      .map(teacherID => +teacherID);
    const teachers = server.db.getState().teachers;
    const teachersListById = teachers.filter(teacher =>
      teachersID.includes(teacher.id));
    res.json(teachersListById);
  });

  router.get('/teacher/:id', (req, res) => {
    const teacherId = req.params.id;
    const teachers = server.db.getState().teachers;
    const teacher = teachers
      .find(teacher => teacher.id === +teacherId);
    res.json(teacher);
  });

  return router;
};
