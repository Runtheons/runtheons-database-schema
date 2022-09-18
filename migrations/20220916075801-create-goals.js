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
		await queryInterface.addIndex("goals", ["type"]);
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable("goals");
	},
};