const fs = require('fs');
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

  router.put('/students', (req, res) => {
    const params = {};
    req.body.params.updates
      .forEach(item => { params[item.param] = item.value });
    let { newStudents } = params;
    newStudents = JSON.parse(newStudents);
    let students = server.db.getState().students;
    newStudents.forEach(newStudent => {
      students = students.map(student => {
        if (student.id === newStudent.id) {
          return newStudent;
        }
        return student;
      })
    })

    fs.writeFile("./services/core/students/students.db.json",
      JSON.stringify({ "students": students }, 0, 2),
      function (error) {
        if (error) throw error;
        res.status(200).json(null);
      });
  });

  return router;
};
