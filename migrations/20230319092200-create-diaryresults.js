"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("diaryresults", {
			idDiaryResult: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			idUser: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'idUser'
				},
			},
			date: {
				type: Sequelize.DATEONLY,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false
			},
			idDiaryCategory: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'diarycategories',
					key: 'idDiaryCategory'
				},
			},
			status: {
				type: Sequelize.ENUM(["PUBLIC", "PRIVATE", "DELETED"]),
				defaultValue: "PUBLIC"
			},
			description: {
				type: Sequelize.STRING(500)
			},
			resultType: {
				type: Sequelize.ENUM(["VALUE", "AVERAGE"]),
				defaultValue: "VALUE"
			},
			resultValue: {
				type: Sequelize.FLOAT,
				defaultValue: 0
			},
			resultUnit: {
				type: Sequelize.ENUM(["ms", "s", "min", "mt"]),
				defaultValue: "s"
			},
			image: {
				type: Sequelize.STRING(200)
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("diaryresults");
	},
};