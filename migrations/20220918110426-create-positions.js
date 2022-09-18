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
				validate: {
					min: -90.0,
					max: 90.0,
				},
			},
			longitude: {
				type: Sequelize.FLOAT,
				validate: {
					min: -180.0,
					max: 180.0,
				},
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