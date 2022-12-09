"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("goals", [
			{ idGoal: '1', type: 'PROFESSIONIST', description: 'TROVARE NUOVI CLIENTI' },
			{ idGoal: '2', type: 'PROFESSIONIST', description: 'TROVARE I MIEI PRIMI CLIENTI' },
			{ idGoal: '3', type: 'PROFESSIONIST', description: 'INIZIARE LA MIA NUOVA CARRIERA' },
			{ idGoal: '4', type: 'PROFESSIONIST', description: 'CONFRONTARMI CON ALTRI PROFESSIONISTI' },
			{ idGoal: '5', type: 'PROFESSIONIST', description: 'VEDERE COME FUNZIONA RUNTHEONS' },
			{ idGoal: '6', type: 'ATHLETE', description: 'LA MIA ANSIA PRE GARA' },
			{ idGoal: '7', type: 'ATHLETE', description: 'LA GESTIONE DELLE MIE EMOZIONI' },
			{ idGoal: '8', type: 'ATHLETE', description: 'LA MIA BASSA AUTOSTIMA' },
			{ idGoal: '9', type: 'ATHLETE', description: 'LA MIA ALIMENTAZIONE' },
			{ idGoal: '10', type: 'ATHLETE', description: 'LA MIA DEPRESSIONE' },
			{ idGoal: '11', type: 'ATHLETE', description: 'MI SENTO CONFUSO' },
			{ idGoal: '12', type: 'ATHLETE', description: 'IL MIO COACH NON È ADATTO' },
			{ idGoal: '13', type: 'ATHLETE', description: 'NON ESSERE SEGUITO CORRETTAMENTE' },
			{ idGoal: '14', type: 'ATHLETE', description: 'MI MANCA IL GIUSTO PARTNER IN ALLENAMENTO' },
			{ idGoal: '15', type: 'ATHLETE', description: 'NON CREDO DI AVERE TALENTO' },
			{ idGoal: '28', type: 'ATHLETE', description: 'LA MIA MANCANZA DI SERIETÀ NEL LAVORO' },
			{ idGoal: '29', type: 'ATHLETE', description: 'IL RAPPORTO CON LA MIA FAMIGLIA' },
			{ idGoal: '30', type: 'ATHLETE', description: 'LA MIA MOTIVAZIONE' },
			{ idGoal: '31', type: 'ATHLETE', description: 'IL MIO POCO TEMPO' },
			{ idGoal: '32', type: 'ATHLETE', description: 'IL MIO LAVORO' },
			{ idGoal: '33', type: 'ATHLETE', description: 'I MIEI PROBLEMI FISICI' },
			{ idGoal: '34', type: 'ATHLETE', description: 'LA MIA FORZA DI VOLONTÀ' },
			{ idGoal: '35', type: 'ATHLETE', description: 'LA MIA POCA COSTANZA' },
			{ idGoal: '36', type: 'ATHLETE', description: 'LA MIA ETÀ' },
			{ idGoal: '37', type: 'ATHLETE', description: 'NON SO QUALI SONO I MIEI LIMITI' },
		]);
	},
	down: async(queryInterface, Sequelize) => {},
};