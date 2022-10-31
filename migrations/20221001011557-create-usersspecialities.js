'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("usersspecialities", {
			idUser: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'idUser'
				},
				primaryKey: true
			},
			idSpeciality: {
				type: Sequelize.INTEGER,
				references: {
					model: 'specialities',
					key: 'idSpeciality'
				},
				primaryKey: true
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("usersspecialities");
	}
};