"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("events", "OLD_events");
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("OLD_events", "events");
	},
};