'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("userssports", {
			idUser: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'idUser'
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
		await queryInterface.dropTable("userssports");
	}
};