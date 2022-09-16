"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("specialities", {
			idSpeciality: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			description: {
				type: Sequelize.STRING(150),
				unique: true,
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("specialities");
	},
};