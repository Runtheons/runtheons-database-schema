"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.changeColumn("events", "idUser", {
			type: Sequelize.INTEGER,
			references: {
				model: 'users',
				key: 'idUser'
			},
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.changeColumn("events", "idUser", {
			type: Sequelize.INTEGER,
		});
	},
};