/* eslint-disable no-console */
const Student = require('../db/models/Student');

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
