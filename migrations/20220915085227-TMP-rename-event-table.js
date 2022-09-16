"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("events", "OLD_events");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_events", "events");
		} catch (e) {
			console.log(e);
		}
	},
};