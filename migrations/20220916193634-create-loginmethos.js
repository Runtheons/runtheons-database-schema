"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("loginmethods", {
			idLoginMethod: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			idUser: {
				type: Sequelize.INTEGER,
			},
			type: {
				type: Sequelize.ENUM(["CLASSIC"]),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(150),
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(150),
				allowNull: true,
				defaultValue: null,
			},
			dateCreation: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			lastUpdate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
		try {
			await queryInterface.addIndex("loginmethods", ["idUser", "email"], {
				unique: true,
			});
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.addIndex("loginmethods", ["idUser"], {
				unique: false,
			});
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.removeIndex("loginmethods", ["idUser"]);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.removeIndex("loginmethods", ["idUser", "email"]);
		} catch (e) {
			console.log(e);
		}
		await queryInterface.dropTable("loginmethods");
	},
};