"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			idUser: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			status: {
				type: Sequelize.ENUM([
					"NOT ACTIVE",
					"SEMIACTIVE",
					"ACTIVE",
					"BANNED",
					"DELETED",
				]),
				allowNull: false,
			},
			type: {
				type: Sequelize.ENUM(["ATHLETE", "PROFESSIONIST"]),
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(150),
				allowNull: false,
			},
			surname: {
				type: Sequelize.STRING(150),
				allowNull: false,
			},
			dateBirth: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			sex: {
				type: Sequelize.ENUM([
					"MALE",
					"FEMALE",
					"BINARY",
					"PANGENDER",
					"BIGENDER",
					"GENDER FLUID",
					"NOT SPECIFIED",
				]),
				allowNull: true,
				defaultValue: "NOT SPECIFIED",
			},
			photo: {
				type: Sequelize.STRING(250),
				allowNull: true,
			},
			cover: {
				type: Sequelize.STRING(250),
				allowNull: true,
			},
			title: {
				type: Sequelize.STRING(150),
				allowNull: true,
				defaultValue: null,
			},
			biography: {
				type: Sequelize.STRING(5000),
				allowNull: true,
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
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	},
};