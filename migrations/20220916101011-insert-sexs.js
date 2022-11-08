"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("sexs", [
			{ idSex: "MALE" },
			{ idSex: "FEMALE" },
			{ idSex: "BINARY" },
			{ idSex: "PANGENDER" },
			{ idSex: "BIGENDER" },
			{ idSex: "GENDER FLUID" },
			{ idSex: "NOT SPECIFIED" },
		]);
	},

	down: async(queryInterface, Sequelize) => {

	},
};