const express = require('express');
const router = express.Router();

module.exports = (server) => {

	router.get('/students', (req, res, next) => {
		let students = server.db.getState().students;
		res.json(students);
	});
	
	return router;
};
