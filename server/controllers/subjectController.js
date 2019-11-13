/* eslint-disable no-console */
const Subject = require('../db/models/Subject');

exports.subject_create_post = (req, res) => {
  const createSubject = subjectData => new Subject(subjectData).save();
  createSubject(req.body)
    .then(() => {
      console.log('Subject created');
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

exports.subjects_info_get = (req, res) => {
  Subject.find()
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

exports.subject_find_get = (req, res) => {
  const subjectName = req.params[0];

  Subject.findOne({ name: subjectName })
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