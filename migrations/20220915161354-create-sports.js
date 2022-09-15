"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("sports", {
			idSport: {
				type: Sequelize.STRING(150),
				primaryKey: true,
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("sports");
	},
};