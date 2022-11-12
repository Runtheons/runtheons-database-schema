"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.addConstraint('loginmethods', {
				fields: ['idUser'],
				type: 'foreign key',
				name: 'users_loginmethods_fk',
				references: {
					table: 'users',
					field: 'idUser'
				}
			});
		}
	},
	down: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.removeConstraint('loginmethods', 'users_loginmethods_fk');
		}
	},
};