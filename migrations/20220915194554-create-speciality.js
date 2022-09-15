"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("specialities", {
			idSpeciality: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("specialities");
	},
};