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
				allowNull: false,
				references: {
					model: 'users',
					key: 'idUser'
				}
			},
			description: {
				type: Sequelize.STRING(150),
				allowNull: false
			},
		}, {
			uniqueKeys: {
				diarycategories_multiple_unique: {
					fields: ["idUser", "description"]
				}
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("diarycategories");
	},
};