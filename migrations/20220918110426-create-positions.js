"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("positions", {
			idPosition: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			latitude: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			longitude: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			addressName: {
				type: Sequelize.STRING(200),
				allowNull: true,
			},
			radius: {
				type: Sequelize.FLOAT,
				allowNull: true,
				defaultValue: null,
			},
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("positions");
	},
};