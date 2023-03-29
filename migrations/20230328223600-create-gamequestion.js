"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("gamequestions", {
			idGameQuestion: {
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
			idSpeciality: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'specialities',
					key: 'idSpeciality'
				}
			},
			image: {
				type: Sequelize.STRING(200),
			},
			question: {
				type: Sequelize.STRING(200),
				allowNull: false
			},
			optionA: {
				type: Sequelize.STRING(200),
				allowNull: false
			},
			optionB: {
				type: Sequelize.STRING(200),
				allowNull: false
			},
			optionC: {
				type: Sequelize.STRING(200),
				allowNull: false
			},
			optionD: {
				type: Sequelize.STRING(200),
				allowNull: false
			},
			correct: {
				type: Sequelize.ENUM(["A", "B", "C", "D"]),
				allowNull: false
			},
			dateCreation: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			lastUpdate: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("gamequestions");
	},
};