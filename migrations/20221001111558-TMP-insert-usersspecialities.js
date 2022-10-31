"use strict";

const { dateFormat } = require("../utils");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO usersgoals(idUser, idGoal)
				SELECT idUser, idGoal
				FROM OLD_usergoal
                WHERE idGoal IN (SELECT idGoal FROM goals) AND 
                	idUser IN (SELECT idUser FROM users)`);
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {},
};