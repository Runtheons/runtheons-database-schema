'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.addColumn('users', 'idTarget', {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: null,
			after: 'idCustomer'
		});
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.removeColumn('users', "idTarget");
	}
};