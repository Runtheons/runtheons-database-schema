"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.changeColumn("events", "type", {
			type: Sequelize.ENUM([
				"LOGINMETHOD_CREATE",
				"LOGINMETHOD_UPDATE",
				"LOGINMETHOD_DELETE",
			]),
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.changeColumn("events", "type", {
			type: Sequelize.ENUM(["USER_CREATION"]),
		});
	},
};