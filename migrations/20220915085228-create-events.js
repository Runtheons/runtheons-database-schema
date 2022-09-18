"use strict";

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
		await queryInterface.addIndex("events", ["idUser"], {
			unique: false,
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("events");
	},
};