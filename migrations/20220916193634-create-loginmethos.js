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
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			lastUpdate: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
		await queryInterface.addIndex("loginmethods", ["idUser", "email"], {
			unique: true,
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("loginmethods");
	},
};