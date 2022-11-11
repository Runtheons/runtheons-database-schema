"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		// await queryInterface.addConstraint('events', {
		// 	type: 'FOREIGN KEY',
		// 	fields: ['idUser'],
		// 	references: {
		// 		table: 'users',
		// 		field: 'idUser'
		// 	},
		// 	name: 'events_users_fk',
		// });
	},
	down: async(queryInterface, Sequelize) => {
		// await queryInterface.removeConstraint('events', 'events_users_fk');
	},
};