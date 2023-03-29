"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("gameansers", {
			idGameAnser: {
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
				}
			},
			idGameQuestion: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'gamequestions',
					key: 'idGameQuestion'
				}
			},
			dateCreation: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("gameansers");
	},
};