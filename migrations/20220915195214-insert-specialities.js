"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("specialities", [
			{ idSpeciality: "BIOLOGO NUTRIZIONISTA" },
			{ idSpeciality: "COACH DI ATLETICA" },
			{ idSpeciality: "COACH DI BASKET" },
			{ idSpeciality: "COACH DI CALCIO" },
			{ idSpeciality: "COACH DI CALISTHENICS" },
			{ idSpeciality: "COACH DI NUOTO" },
			{ idSpeciality: "DIETISTA" },
			{ idSpeciality: "FISIOTERAPISTA SPORTIVO" },
			{ idSpeciality: "LIFE COACH" },
			{ idSpeciality: "MASSAGGIATORE SPORTIVO" },
			{ idSpeciality: "MENTAL COACH SPORTIVO" },
			{ idSpeciality: "NUTRIZIONISTA SPORTIVO" },
			{ idSpeciality: "OSTEOPATA SPORTIVO" },
			{ idSpeciality: "PERSONAL TRAINER" },
			{ idSpeciality: "PREPARATORE ATLETICO" },
			{ idSpeciality: "PSICOLOGO SPORTIVO" },
		]);
	},

	down: async(queryInterface, Sequelize) => {},
};