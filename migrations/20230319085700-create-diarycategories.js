"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("diarycategories", {
			idDiaryCategory: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			idUser: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(150),
				allowNull: false
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("diarycategories");
	},
};