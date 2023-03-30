"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("olimpusrequests", {
			idOlimpusRequest: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			idUserOwner: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'idUser'
				}
			},
			idUser: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'idUser'
				}
			},
			status: {
				type: Sequelize.ENUM([
					"INVITED", 	// A invited B
					"REQUESTED",// B request A to add he
					"CONNECT", 	// A and B are connect
					"REJECTED", // B reject the invite of A
					"REFUSED", 	// A reject to add B
					"DELETED",  // A remove B
				]),
				allowNull: false
			},
			message: {
				type: Sequelize.STRING(500)
			},
			dateCreation: {
				type: Sequelize.DATE,
				allowNull: false
			},
			lastUpdate: {
				type: Sequelize.DATE,
				allowNull: false
			},
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("olimpusrequests");
	},
};