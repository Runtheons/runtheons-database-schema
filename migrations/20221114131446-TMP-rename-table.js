"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("professionists", "OLD_professionists");
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.renameTable("athletes", "OLD_athletes");
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.renameTable("administrators", "OLD_administrators");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_professionists", "professionists");
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.renameTable("OLD_athletes", "athletes");
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.renameTable("OLD_administrators", "administrators");
		} catch (e) {
			console.log(e);
		}
	},
};