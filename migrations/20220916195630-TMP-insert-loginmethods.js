"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO loginmethods(idUser, type, email, password, dateCreation, lastUpdate)
			SELECT 
				U.id AS idUser, 
				"CLASSIC" AS type,
				U.email AS email,
				U.password AS password,
				U.dateCreation AS dateCreation,
				U.lastUpdate AS dateCreation
			FROM users AS U`);
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {},
};