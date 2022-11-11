'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("usersgoals", {
			idUser: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'idUser'
				},
				primaryKey: true
			},
			idGoal: {
				type: Sequelize.INTEGER,
				references: {
					model: 'goals',
					key: 'idGoal'
				},
				primaryKey: true
			},
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("usersgoals");
	}
};