"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("specialities", "OLD_specialities");
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("OLD_specialities", "specialities");
	},
};