"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("usergoal", "OLD_usergoal");
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_usergoal", "usergoal");
		} catch (e) {
			console.log(e);
		}
	},
};