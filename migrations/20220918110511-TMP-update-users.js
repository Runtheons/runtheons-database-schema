"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize.query(
				`UPDATE users SET type="ATHLETE" WHERE id IN (87, 93, 159)`
			);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.sequelize.query(
				`INSERT INTO athletes (idUser, name, surname, idGoal) VALUES 
				(87,'Gabri','Giunta', 8), 
				(93,'Var','var', 8), 
				(159,'Ousseni','Work', 8)`
			);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.sequelize.query(
				`UPDATE users SET type="PROFESSIONIST" WHERE id IN (85, 86, 88, 89, 90, 91, 92, 94, 95)`
			);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.sequelize.query(
				`INSERT INTO professionists (idUser, name, surname) VALUES 
				(62, 'Andrea', 'Pisccelli'),
				(63, 'Testing', 'Testing')`
			);
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize.query(
				`DELETE FROM athletes WHERE idUser IN (87, 93, 159)`
			);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.sequelize.query(
				`DELETE FROM professionists WHERE idUser IN (62, 63)`
			);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.sequelize.query(
				`UPDATE users SET type=NULL WHERE id IN (87, 93,85, 86, 88, 89, 90, 91, 92, 94, 95,159)`
			);
		} catch (e) {
			console.log(e);
		}
	},
};