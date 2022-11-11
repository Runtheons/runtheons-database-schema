"use strict";

const { dateFormat } = require("../utils");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO userssports(idUser, idSport)
				SELECT idUser, idSport
				FROM OLD_usersport
                WHERE idSport IN (SELECT idSport FROM sports) AND 
					idUser IN (SELECT idUser FROM users)`);
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {},
};