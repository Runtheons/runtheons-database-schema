"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.addIndex('loginmethods', {
				fields: ['idUser', 'email', 'type'],
				type: 'UNIQUE',
				name: 'loginmethods_multiple_unique',
			});
		}
	},
	down: async(queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.removeIndex('loginmethods', 'loginmethods_multiple_unique');
		}
	},
};