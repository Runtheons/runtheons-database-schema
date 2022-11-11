"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("userspeciality", "OLD_userspeciality");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_userspeciality", "userspeciality");
		} catch (e) {
			console.log(e);
		}
	},
};