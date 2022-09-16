"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("sports", "OLD_sports");
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("OLD_sports", "sports");
	},
};