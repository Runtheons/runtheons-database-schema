"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
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
	},

	down: async(queryInterface, Sequelize) => {},
};