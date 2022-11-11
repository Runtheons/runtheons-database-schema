'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE users ADD idTarget INTEGER AFTER idCustomer`);
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`ALTER TABLE users DROP idTarget`);
	}
};