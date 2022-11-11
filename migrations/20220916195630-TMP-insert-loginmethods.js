"use strict";

const { dateFormat } = require("./../utils");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO loginmethods(idUser, type, email, password, dateCreation, lastUpdate)
			SELECT 
				U.id AS idUser, 
				"CLASSIC" AS type,
				U.email AS email,
				U.password AS password,
				U.dateCreation AS dateCreation,
				U.lastUpdate AS dateCreation
			FROM users AS U`);

			let [result, metadata] = await queryInterface.sequelize.query(`SELECT * FROM loginmethods`);

			for (let i = 0; i < result.length; i++) {
				let loginmethod = result[i];

				loginmethod.dateCreation = dateFormat(loginmethod.dateCreation);
				loginmethod.lastUpdate = dateFormat(loginmethod.lastUpdate)

				await queryInterface.sequelize.query(`INSERT INTO events(idUser, datetime, type, value, new) VALUES (${loginmethod.idUser}, "${loginmethod.dateCreation}", "LOGINMETHOD_CREATE", ${loginmethod.idLoginMethod}, :new)`, {
					replacements: { new: JSON.stringify(loginmethod) }
				});

			}
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {},
};