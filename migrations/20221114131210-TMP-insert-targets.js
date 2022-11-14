"use strict";

const { dateFormat } = require("../utils");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			let [result, metadata] = await queryInterface.sequelize
				.query(`SELECT 
					idUser,
					minRange,
					maxRange,
					targetSex
				FROM professionists
				WHERE minRange IS NOT NULL
				ORDER BY idUser`);


			for (let i = 0; i < result.length; i++) {
				let user = result[i];

				let [idTarget, metadata] = await queryInterface.sequelize.query(`INSERT INTO targets(type, minAge, maxAge, dateCreation, lastUpdate) VALUES('OR', ${user.minRange}, ${user.maxRange}, NOW(), NOW())`);

				await queryInterface.sequelize.query(`UPDATE users SET idTarget=${idTarget} WHERE idUser=${user.idUser}`);

				let [target, meta] = await queryInterface.sequelize.query(`SELECT * FROM targets WHERE idTarget = ${idTarget}`);

				await queryInterface.sequelize.query(`INSERT INTO events(idUser, datetime, type, value) VALUES (${user.idUser}, NOW(), "TARGET_CREATE", :new)`, {
					replacements: { new: JSON.stringify(target) }
				});

				if (user.targetSex == "ALL GENDER") {
					await queryInterface.sequelize.query(`INSERT INTO targetssexs (idTarget, idSex)
					SELECT 
						${idTarget} AS idUser,
						idSex
					FROM sexs
					WHERE idSex NOT IN ('NOT SPECIFIED')`);
				}

				await queryInterface.sequelize.query(`INSERT INTO targetssports (idTarget, idSport)
				SELECT ${idTarget} AS idTarget, idSportTarget
				FROM OLD_sporttarget
				WHERE idUser=${user.idUser} AND idSportTarget IN (SELECT idSport FROM sports)`);
			}

		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {},
};