"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("loginmethods", {
			idLoginMethod: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			idUser: {
				type: Sequelize.INTEGER,
			},
			type: {
				type: Sequelize.ENUM(["CLASSIC"]),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(150),
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(150),
				allowNull: true,
				defaultValue: null,
			},
			dateCreation: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			lastUpdate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("loginmethods");
	},
};