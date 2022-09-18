"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("loginmethods", [{
			idUser: 1,
			type: "CLASSIC",
			email: "gallinar00@gmail.com",
			password: "123456",
		}, ]);
	},

	down: async(queryInterface, Sequelize) => {},
};