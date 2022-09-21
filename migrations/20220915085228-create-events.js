"use strict";

const { createTestScheduler } = require("jest");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("events", {
			idEvent: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			idUser: {
				type: Sequelize.INTEGER,
			},
			datetime: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			type: {
				type: Sequelize.ENUM(["USER_CREATION"]),
				allowNull: false,
			},
			value: {
				type: Sequelize.INTEGER,
			},
			old: {
				type: Sequelize.STRING(5000),
				allowNull: true,
			},
			new: {
				type: Sequelize.STRING(5000),
				allowNull: true,
			},
		});
		try {
			await queryInterface.addIndex("events", ["idUser"], {
				unique: false,
			});
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.dropIndex("events", ["idUser"]);
		} catch (e) {
			console.log(e);
		}
		await queryInterface.dropTable("events");
	},
};