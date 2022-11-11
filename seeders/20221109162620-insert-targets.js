'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("targets", [{
			idTarget: 1,
			type: 'OR',
			minAge: 20,
			maxAge: 50,
			dateCreation: "2022-01-01 00:00:00",
			lastUpdate: "2022-01-01 00:00:00"
		}]);
		// await queryInterface.sequelize.query(`UPDATE users SET idTarget=1 WHERE idUser=2`);

	},
	down: async(queryInterface, Sequelize) => {}
};