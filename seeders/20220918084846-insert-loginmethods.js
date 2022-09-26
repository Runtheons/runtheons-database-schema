"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("loginmethods", [{
			idUser: 1,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "123456",
			dateCreation: "2022-01-01 00:00:00",
			lastUpdate: "2022-01-01 00:00:00"
		}, ]);
	},

	down: async(queryInterface, Sequelize) => {},
};