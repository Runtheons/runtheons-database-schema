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
					"SEMI ACTIVE",
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
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			sex: {
				type: Sequelize.STRING(50),
				allowNull: false,
				defaultValue: "NOT SPECIFIED",
				references: {
					model: "sexs",
					key: 'idSex'
				}
			},
			photo: {
				type: Sequelize.STRING(250),
				allowNull: true,
			},
			cover: {
				type: Sequelize.STRING(250),
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING(25),
				allowNull: true,
			},
			idPosition: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: null,
				references: {
					model: 'positions',
					key: 'idPosition'
				},
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
			idCustomer: {
				type: Sequelize.STRING(150),
				allowNull: true,
			},
			motto: {
				type: Sequelize.STRING(250),
				allowNull: true,
			},
			stripeConnectAccount: {
				type: Sequelize.STRING(150),
				allowNull: true,
			},
			workOnline: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
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
		await queryInterface.dropTable("users");
	},
};