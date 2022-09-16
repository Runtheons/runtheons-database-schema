"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("goals", "OLD_goals");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_goals", "goals");
		} catch (e) {
			console.log(e);
		}
	},
};