"use strict";

const { dateFormat } = require("./../utils");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO users(idUser, status, type, dateBirth, sex, photo, phone, cover, title, biography, idCustomer, name, surname, motto, stripeConnectAccount, workOnline, dateCreation, lastUpdate)
				SELECT sub.*
				FROM (
					SELECT 
						O.id AS idUser,
						IFNULL(O.status, "ACTIVE") AS status,
						O.type AS type,
						O.dateBirth AS dateBirth,
						IFNULL( IF(O.sex = 'M', 'MALE', IF(O.sex = 'F', 'FEMALE', NULL) ), "MALE")AS sex,
						O.photo AS photo,
						O.phone AS phone,
						O.cover AS cover,
						NULL AS title,
						O.bio AS biography,
						O.idCustomer,
						athletes.name AS name,
						athletes.surname AS surname,
						NULL AS motto, 
						NULL AS stripeConnectAccount, 
						NULL AS workOnline,
						O.dateCreation AS dateCreation,
						O.lastUpdate AS lastUpdate
					FROM OLD_users AS O
					RIGHT JOIN athletes ON O.id = athletes.idUser 
					WHERE O.type = "ATHLETE"
				
					UNION
				
					SELECT 
						O.id AS idUser,
						IFNULL(O.status, "ACTIVE") AS status,
						O.type AS type,
						O.dateBirth AS dateBirth,
						IFNULL( IF(O.sex = 'M', 'MALE', IF(O.sex = 'F', 'FEMALE', NULL) ), "MALE")AS sex,
						O.photo AS photo,
						O.phone AS phone,
						O.cover AS cover,
						IF(O.sex = 'M', 'Dott.', IF(O.sex = 'F', 'D.ssa', NULL) ) AS title,
						O.bio AS biography,
						O.idCustomer,
						professionists.name AS name,
						professionists.surname AS surname,
						professionists.motto AS motto, 
						professionists.stripeAccount AS stripeConnectAccount, 
						professionists.workOnline AS workOnline,
						O.dateCreation AS dateCreation,
						O.lastUpdate AS lastUpdate
					FROM OLD_users AS O
					RIGHT JOIN professionists ON O.id = professionists.idUser 
					WHERE O.type = "PROFESSIONIST"
				
				) AS sub
				ORDER BY idUser`);

			let [result, metadata] = await queryInterface.sequelize.query(`SELECT * FROM users`);

			for (let i = 0; i < result.length; i++) {
				let user = result[i];

				user.dateCreation = dateFormat(user.dateCreation);
				user.lastUpdate = dateFormat(user.lastUpdate)

				await queryInterface.sequelize.query(`INSERT INTO events(idUser, datetime, type, value, new) VALUES (${user.idUser}, "${user.dateCreation}", "USER_CREATE", ${user.idUser}, :new)`, {
					replacements: { new: JSON.stringify(user) }
				});

			}
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {},
};