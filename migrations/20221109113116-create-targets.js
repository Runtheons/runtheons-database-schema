'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("targets", {
			idTarget: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			type: {
				type: Sequelize.ENUM(["AND", "OR"]),
				defaultValue: "OR",
				allowNull: false,
			},
			minAge: {
				type: Sequelize.INTEGER,
				defaultValue: 13,
				allowNull: false,
			},
			maxAge: {
				type: Sequelize.INTEGER,
				defaultValue: 40,
				allowNull: false,
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
		await queryInterface.dropTable("targets");
	}
};