"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("sports", [
			{ idSport: '1', description: 'NESSUNO' },
			{ idSport: '2', description: 'ATLETICA LEGGERA' },
			{ idSport: '3', description: 'PALLAVOLO' },
			{ idSport: '4', description: 'ARTI MARZIALI' },
			{ idSport: '5', description: 'BASKET' },
			{ idSport: '6', description: 'CALCIO' },
			{ idSport: '7', description: 'CANOTTAGGIO' },
			{ idSport: '8', description: 'CANOA' },
			{ idSport: '9', description: 'CICLISMO' },
			{ idSport: '10', description: 'DANZA' },
			{ idSport: '11', description: 'GINNASTICA' },
			{ idSport: '12', description: 'SCI' },
			{ idSport: '13', description: 'TENNIS' },
			{ idSport: '14', description: 'PUGILATO' },
			{ idSport: '15', description: 'PING PONG' },
			{ idSport: '16', description: 'VELA' },
			{ idSport: '17', description: 'TRIATHLON' },
			{ idSport: '18', description: 'CALISTHENICS' },
			{ idSport: '19', description: 'PALESTRA' },
			{ idSport: '27', description: 'ARRAMPICATA' },
			{ idSport: '28', description: 'AMATORE' },
			{ idSport: '31', description: 'NUOTO' },
		]);
	},
	down: async(queryInterface, Sequelize) => {},
};