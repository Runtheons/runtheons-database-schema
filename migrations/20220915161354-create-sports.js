"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("sports", {
			idSport: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("sports");
	},
};