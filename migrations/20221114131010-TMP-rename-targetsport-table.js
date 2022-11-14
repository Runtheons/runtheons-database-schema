"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("sporttarget", "OLD_sporttarget");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_sporttarget", "sporttarget");
		} catch (e) {
			console.log(e);
		}
	},
};