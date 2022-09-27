"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.addConstraint("users", {
			fields: ['idPosition'],
			type: 'FOREIGN KEY',
			references: {
				table: 'positions',
				field: 'idPosition'
			}
		})
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("users", ["idPosition"])
	},
};