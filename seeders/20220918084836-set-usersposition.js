'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {

		await queryInterface.bulkInsert("positions", [{
			idPosition: 1,
			latitude: 10,
			longitude: 10,
			addressName: "Pos1"
		}, {
			idPosition: 2,
			latitude: 10,
			longitude: 10,
			radius: 10,
			addressName: "Rad1"
		}, {
			idPosition: 3,
			latitude: 20,
			longitude: 20,
			radius: 10,
			addressName: "Rad2"
		}]);
	},

	down: async(queryInterface, Sequelize) => {

	}

};