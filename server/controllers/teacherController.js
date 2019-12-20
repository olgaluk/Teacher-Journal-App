/* eslint-disable no-console */
const Teacher = require('../db/models/Teacher');

exports.teachers_from_subject_get = (req, res, next) => {
  if (!req.query.idList) {
    next();
  } else {
    const { idList } = req.query;
    const id = JSON.parse(idList);

    Teacher.find({ id: { $in: id } }, { _id: 0 })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  }
};

exports.teachers_list_get = (req, res) => {
  Teacher.find({}, { _id: 0 })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};


exports.teacher_by_id_get = (req, res) => {
  const id = req.params[0];

  Teacher.findOne({ id }, { _id: 0 })
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

exports.teachers_from_other_subjects_get = (req, res) => {
  const { teachersID } = req.query;
  const id = JSON.parse(teachersID);

  Teacher.find({ id: { $nin: id } }, { _id: 0 })
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