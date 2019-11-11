const express = require('express');
const router = express.Router();

module.exports = (server) => {

  router.get('/students', (req, res) => {
    let students = server.db.getState().students;
    res.json(students);
  });

  router.get('/students/:subjectId/:teacherId', (req, res) => {
    const { teacherId, subjectId } = req.params;
    const students = server.db.getState().students;
    const studensListByTeacher = students
      .filter(student => {
        const studentList = student.academicPerformance.filter(infoStudent =>
          infoStudent.subjectId === +subjectId
          && infoStudent.teacherId === +teacherId);
        return studentList.length ? true : false;
      });

    res.json(studensListByTeacher);
  });

  return router;
};
