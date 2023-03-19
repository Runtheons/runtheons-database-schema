"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.addIndex('diarycategories', {
				fields: ['idUser', 'description'],
				type: 'UNIQUE',
				name: 'diarycategories_multiple_unique',
			});
		}
	},
	down: async (queryInterface, Sequelize) => {
		if (queryInterface.sequelize.dialect.name == "mysql") {
			await queryInterface.removeIndex('diarycategories', 'diarycategories_multiple_unique');
		}
	},
};