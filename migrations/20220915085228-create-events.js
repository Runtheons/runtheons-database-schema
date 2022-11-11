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
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("events");
	},
};