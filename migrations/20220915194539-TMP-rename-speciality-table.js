"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("specialities", "OLD_specialities");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("sports", "OLD_specialities");
		} catch (e) {
			console.log(e);
		}
	},
};