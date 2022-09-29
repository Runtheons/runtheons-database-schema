'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {

		await queryInterface.bulkInsert("users", [{
			idUser: 1,
			name: "Roberto",
			surname: "Gallina",
			status: "ACTIVE",
			type: "ATHLETE",
			dateCreation: "2022-01-01 00:00:00",
			lastUpdate: "2022-01-01 00:00:00"
		}, {
			idUser: 2,
			name: "Roberto",
			surname: "Professionista",
			status: "ACTIVE",
			type: "PROFESSIONSIST",
			dateCreation: "2022-01-01 00:00:00",
			lastUpdate: "2022-01-01 00:00:00"
		}]);

	},

	down: async(queryInterface, Sequelize) => {

	}

};