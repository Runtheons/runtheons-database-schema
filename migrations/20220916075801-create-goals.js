"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("goals", {
			idGoal: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			type: {
				type: Sequelize.ENUM(["ATHLETE", "PROFESSIONIST"]),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(150),
				unique: true,
			},
		});
		try {
			await queryInterface.addIndex("goals", ["type"]);
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.removeIndex("goals", ["type"]);
		} catch (e) {
			console.log(e);
		}
		await queryInterface.dropTable("goals");
	},
};