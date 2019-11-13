/* eslint-disable no-console */
const Student = require('../db/models/Student');

exports.student_create_post = (req, res) => {
  const createStudent = studentData => new Student(studentData).save();
  createStudent(req.body)
    .then(() => {
      console.log('Student created');
      res.status(201).json(null);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(406).send('Not Acceptable');
      } else {
        res.status(501).send('Not Implemented');
      }
    });
};

exports.students_info_get = (req, res) => {
  Student.find()
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(412).send('Precondition Failed');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

exports.students_by_teacher_get = (req, res) => {
  const { teacherId, subjectId } = req.query;

  Student
    .find({}, 'academicPerformance')
    .find({ 'academicPerformance.teacherId': teacherId, 'academicPerformance.subjectId': subjectId })
    .then((result) => {
      if (!result.length) res.status(200).send(result);
      const studentsId = result.map(infoStudent => infoStudent._id);
      return Student.find({ _id: { $in: studentsId } });
    })
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};
