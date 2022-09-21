"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.sequelize
				.query(`INSERT INTO users(idUser, status, type, dateBirth, sex, photo, cover, title, biography, name, surname, dateCreation, lastUpdate)
				SELECT sub.*
				FROM (
					SELECT 
						O.id AS idUser,
						IFNULL(O.status, "ACTIVE") AS status,
						O.type AS type,
						O.dateBirth AS dateBirth,
						IF(O.sex = 'M', 'MALE', IF(O.sex = 'F', 'FEMALE', NULL) ) AS sex,
						O.photo AS photo,
						O.cover AS cover,
						NULL AS title,
						O.bio AS biography,
						athletes.name AS name,
						athletes.surname AS surname,
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
						IF(O.sex = 'M', 'MALE', IF(O.sex = 'F', 'FEMALE', NULL) ) AS sex,
						O.photo AS photo,
						O.cover AS cover,
						IF(O.sex = 'M', 'Dott.', IF(O.sex = 'F', 'D.ssa', NULL) ) AS title,
						O.bio AS biography,
						professionists.name AS name,
						professionists.surname AS surname,
						O.dateCreation AS dateCreation,
						O.lastUpdate AS lastUpdate
					FROM OLD_users AS O
					RIGHT JOIN professionists ON O.id = professionists.idUser 
					WHERE O.type = "PROFESSIONIST"
				
				) AS sub
				ORDER BY idUser`);
		} catch (e) {
			console.log(e);
		}
	},

	down: async(queryInterface, Sequelize) => {},
};