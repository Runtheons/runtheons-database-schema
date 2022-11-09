'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("targetssexs", {
			idTarget: {
				type: Sequelize.INTEGER,
				references: {
					model: 'targets',
					key: 'idTarget'
				},
				primaryKey: true
			},
			idSex: {
				type: Sequelize.STRING(50),
				references: {
					model: 'sexs',
					key: 'idSex'
				},
				primaryKey: true
			},
		});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("targetssexs");
	}
};