"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("sports", "OLD_sports");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_sports", "sports");
		} catch (e) {
			console.log(e);
		}
	},
};