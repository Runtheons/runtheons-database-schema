"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("specialities", [
			{ idSpeciality: '1', description: 'PERSONAL TRAINER' },
			{ idSpeciality: '2', description: 'MENTAL COACH SPORTIVO' },
			{ idSpeciality: '3', description: 'COACH DI ATLETICA' },
			{ idSpeciality: '4', description: 'PREPARATORE ATLETICO' },
			{ idSpeciality: '5', description: 'FISIOTERAPISTA SPORTIVO' },
			{ idSpeciality: '6', description: 'NUTRIZIONISTA SPORTIVO' },
			{ idSpeciality: '7', description: 'OSTEOPATA SPORTIVO' },
			{ idSpeciality: '8', description: 'DIETISTA' },
			{ idSpeciality: '9', description: 'COACH DI CALCIO' },
			{ idSpeciality: '10', description: 'MASSAGGIATORE SPORTIVO' },
			{ idSpeciality: '16', description: 'BIOLOGO NUTRIZIONISTA' },
			{ idSpeciality: '17', description: 'COACH DI NUOTO' },
			{ idSpeciality: '18', description: 'COACH DI CALISTHENICS' },
			{ idSpeciality: '19', description: 'COACH DI BASKET' },
			{ idSpeciality: '20', description: 'LIFE COACH' },
			{ idSpeciality: '21', description: 'PSICOLOGO SPORTIVO' },
		]);
	},
	down: async(queryInterface, Sequelize) => {},
};