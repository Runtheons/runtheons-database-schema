"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.addConstraint("users", {
			fields: ['idPosition'],
			type: 'foreign key',
			references: {
				table: 'positions',
				field: 'idPosition'
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
			name: "users_positions_fk"
		})
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("users", "users_positions_fk")
	},
};