"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.addConstraint('events', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'users_events_fk',
				references: {
					table: 'users',
					field: 'idUser'
				}
			});
		}
	},
	down: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.removeConstraint('events', 'users_events_fk');
		}
	},
};