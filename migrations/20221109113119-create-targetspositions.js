'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("targetspositions", {
			idTarget: {
				type: Sequelize.INTEGER,
				references: {
					model: 'targets',
					key: 'idTarget'
				},
				primaryKey: true
			},
			idPosition: {
				type: Sequelize.INTEGER,
				references: {
					model: 'positions',
					key: 'idPosition'
				},
				primaryKey: true
			},
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("targetspositions");
	}
};