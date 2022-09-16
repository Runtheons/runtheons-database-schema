"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("specialities", [
			{ description: "BIOLOGO NUTRIZIONISTA" },
			{ description: "COACH DI ATLETICA" },
			{ description: "COACH DI BASKET" },
			{ description: "COACH DI CALCIO" },
			{ description: "COACH DI CALISTHENICS" },
			{ description: "COACH DI NUOTO" },
			{ description: "DIETISTA" },
			{ description: "FISIOTERAPISTA SPORTIVO" },
			{ description: "LIFE COACH" },
			{ description: "MASSAGGIATORE SPORTIVO" },
			{ description: "MENTAL COACH SPORTIVO" },
			{ description: "NUTRIZIONISTA SPORTIVO" },
			{ description: "OSTEOPATA SPORTIVO" },
			{ description: "PERSONAL TRAINER" },
			{ description: "PREPARATORE ATLETICO" },
			{ description: "PSICOLOGO SPORTIVO" },
		]);
	},

	down: async(queryInterface, Sequelize) => {},
};