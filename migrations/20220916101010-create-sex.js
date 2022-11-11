"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("sexs", {
			idSex: {
				type: Sequelize.STRING(50),
				primaryKey: true,
			}
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("sexs");
	},
};