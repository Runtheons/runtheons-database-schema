"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("sports", [
			{ description: "AMATORE" },
			{ description: "ARRAMPICATA" },
			{ description: "ARTI MARZIALI" },
			{ description: "ATLETICA LEGGERA" },
			{ description: "BASKET" },
			{ description: "CALCIO" },
			{ description: "CALISTHENICS" },
			{ description: "CANOA" },
			{ description: "CANOTTAGGIO" },
			{ description: "CICLISMO" },
			{ description: "DANZA" },
			{ description: "GINNASTICA" },
			{ description: "NESSUNO" },
			{ description: "NUOTO" },
			{ description: "PALESTRA" },
			{ description: "PALLAVOLO" },
			{ description: "PING PONG" },
			{ description: "PUGILATO" },
			{ description: "SCI" },
			{ description: "TENNIS" },
			{ description: "TRIATHLON" },
			{ description: "VELA" },
		]);
	},
	down: async(queryInterface, Sequelize) => {},
};