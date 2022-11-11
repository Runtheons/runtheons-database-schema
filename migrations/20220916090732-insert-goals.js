"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("goals", [
			{ type: "PROFESSIONIST", description: "TROVARE NUOVI CLIENTI" },
			{ type: "PROFESSIONIST", description: "TROVARE I MIEI PRIMI CLIENTI" },
			{ type: "PROFESSIONIST", description: "INIZIARE LA MIA NUOVA CARRIERA" },
			{
				type: "PROFESSIONIST",
				description: "CONFRONTARMI CON ALTRI PROFESSIONISTI",
			},
			{ type: "PROFESSIONIST", description: "VEDERE COME FUNZIONA RUNTHEONS" },
			{ type: "ATHLETE", description: "LA MIA ANSIA PRE GARA" },
			{ type: "ATHLETE", description: "LA GESTIONE DELLE MIE EMOZIONI" },
			{ type: "ATHLETE", description: "LA MIA BASSA AUTOSTIMA" },
			{ type: "ATHLETE", description: "LA MIA ALIMENTAZIONE" },
			{ type: "ATHLETE", description: "LA MIA DEPRESSIONE" },
			{ type: "ATHLETE", description: "MI SENTO CONFUSO" },
			{ type: "ATHLETE", description: "IL MIO COACH NON È ADATTO" },
			{ type: "ATHLETE", description: "NON ESSERE SEGUITO CORRETTAMENTE" },
			{
				type: "ATHLETE",
				description: "MI MANCA IL GIUSTO PARTNER IN ALLENAMENTO",
			},
			{ type: "ATHLETE", description: "NON CREDO DI AVERE TALENTO" },
			{ type: "ATHLETE", description: "LA MIA MANCANZA DI SERIETÀ NEL LAVORO" },
			{ type: "ATHLETE", description: "IL RAPPORTO CON LA MIA FAMIGLIA" },
			{ type: "ATHLETE", description: "LA MIA MOTIVAZIONE" },
			{ type: "ATHLETE", description: "IL MIO POCO TEMPO" },
			{ type: "ATHLETE", description: "IL MIO LAVORO" },
			{ type: "ATHLETE", description: "I MIEI PROBLEMI FISICI" },
			{ type: "ATHLETE", description: "LA MIA FORZA DI VOLONTÀ" },
			{ type: "ATHLETE", description: "LA MIA POCA COSTANZA" },
			{ type: "ATHLETE", description: "LA MIA ETÀ" },
			{ type: "ATHLETE", description: "NON SO QUALI SONO I MIEI LIMITI" },
			{
				type: "PROFESSIONIST",
				description: "AUMENTARE IL MIO BACINO DI CLIENTELA",
			},
			{ type: "PROFESSIONIST", description: "ENTRARE NEL MONDO SPORTIVO" },
		]);
	},
	down: async(queryInterface, Sequelize) => {},
};