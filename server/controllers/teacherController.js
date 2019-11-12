/* eslint-disable no-console */
const Teacher = require('../db/models/Teacher');

exports.teachers_info_get = (req, res, next) => {

  Teacher.find()
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
