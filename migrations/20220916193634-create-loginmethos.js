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
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			lastUpdate: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
		await queryInterface.addIndex("loginmethods", ["idUser", "email"], {
			unique: true,
		});
		await queryInterface.addIndex("loginmethods", ["idUser"], {
			unique: false,
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("loginmethods");
	},
};