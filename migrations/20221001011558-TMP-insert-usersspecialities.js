"use strict";

const { dateFormat } = require("../utils");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO usersspecialities(idUser, idSpeciality)
				SELECT idUser, idSpeciality
				FROM professionists
                WHERE idSpeciality IN (SELECT idSpeciality FROM specialities) AND 
					idUser IN (SELECT idUser FROM users)`);
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {},
};