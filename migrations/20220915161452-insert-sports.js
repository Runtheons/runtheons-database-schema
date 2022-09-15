"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("sports", [
			{ idSport: "AMATORE" },
			{ idSport: "ARRAMPICATA" },
			{ idSport: "ARTI MARZIALI" },
			{ idSport: "ATLETICA LEGGERA" },
			{ idSport: "BASKET" },
			{ idSport: "CALCIO" },
			{ idSport: "CALISTHENICS" },
			{ idSport: "CANOA" },
			{ idSport: "CANOTTAGGIO" },
			{ idSport: "CICLISMO" },
			{ idSport: "DANZA" },
			{ idSport: "GINNASTICA" },
			{ idSport: "NESSUNO" },
			{ idSport: "NUOTO" },
			{ idSport: "PALESTRA" },
			{ idSport: "PALLAVOLO" },
			{ idSport: "PING PONG" },
			{ idSport: "PUGILATO" },
			{ idSport: "SCI" },
			{ idSport: "TENNIS" },
			{ idSport: "TRIATHLON" },
			{ idSport: "VELA" },
		]);
	},

	down: async(queryInterface, Sequelize) => {},
};