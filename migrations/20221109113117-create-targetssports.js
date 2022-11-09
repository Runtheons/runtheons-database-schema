'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("targetssports", {
			idTarget: {
				type: Sequelize.INTEGER,
				references: {
					model: 'targets',
					key: 'idTarget'
				},
				primaryKey: true
			},
			idSport: {
				type: Sequelize.INTEGER,
				references: {
					model: 'sports',
					key: 'idSport'
				},
				primaryKey: true
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("targetssports");
	}
};