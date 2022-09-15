"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("specialities", "OLD_specialities");
		await queryInterface.sequelize.query(`ALTER VIEW getusers AS
			SELECT
				users.id AS idUser,
				users.id AS id,
				users.email AS email,
				users.password AS password,
				users.status AS status,
				users.idCustomer AS idCustomer,
				users.userType AS userType,
				users.type AS type,
				users.position AS position,
				users.photo AS photo,
				users.cover AS cover,
				users.sex AS sex,
				users.bio AS bio,
				users.dateBirth AS dateBirth,
				users.phone AS phone,
				users.dateCreation AS dateCreation,
				users.lastUpdate AS lastUpdate,
				athletes.name AS aname,
				athletes.surname AS asurname,
				agoals.id AS agoalid,
				agoals.description AS agoaldescription,
				OLD_sports.id AS sportid,
				OLD_sports.description AS sportdescription,
				professionists.name AS pname,
				professionists.surname AS psurname,
				professionists.stripeAccount AS stripeAccount,
				professionists.curriculum AS curriculum,
				professionists.workOnline AS workOnline,
				professionists.radius AS radius,
				pgoals.id AS pgoalid,
				pgoals.description AS pgoaldescription,
				OLD_specialities.id AS specialityid,
				OLD_specialities.description AS specialitydescription
			FROM users
			LEFT JOIN athletes ON users.id = athletes.idUser AND users.type = "ATHLETE"
			LEFT JOIN goals AS agoals ON athletes.idGoal = agoals.id AND agoals.type = "ATHLETE"
			LEFT JOIN OLD_sports ON athletes.idSport = OLD_sports.id

			LEFT JOIN professionists ON users.id = professionists.idUser AND users.type = "PROFESSIONIST"
			LEFT JOIN goals AS pgoals ON professionists.idGoal = pgoals.id AND pgoals.type = "PROFESSIONIST"
			LEFT JOIN OLD_specialities ON professionists.idSpeciality = OLD_specialities.id`);
	},
	down: async(queryInterface, Sequelize) => {
		await queryInterface.renameTable("OLD_specialities", "specialities");
		await queryInterface.sequelize.query(`ALTER VIEW getusers AS
			SELECT
				users.id AS idUser,
				users.id AS id,
				users.email AS email,
				users.password AS password,
				users.status AS status,
				users.idCustomer AS idCustomer,
				users.userType AS userType,
				users.type AS type,
				users.position AS position,
				users.photo AS photo,
				users.cover AS cover,
				users.sex AS sex,
				users.bio AS bio,
				users.dateBirth AS dateBirth,
				users.phone AS phone,
				users.dateCreation AS dateCreation,
				users.lastUpdate AS lastUpdate,
				athletes.name AS aname,
				athletes.surname AS asurname,
				agoals.id AS agoalid,
				agoals.description AS agoaldescription,
				sports.id AS sportid,
				sports.description AS sportdescription,
				professionists.name AS pname,
				professionists.surname AS psurname,
				professionists.stripeAccount AS stripeAccount,
				professionists.curriculum AS curriculum,
				professionists.workOnline AS workOnline,
				professionists.radius AS radius,
				pgoals.id AS pgoalid,
				pgoals.description AS pgoaldescription,
				specialities.id AS specialityid,
				specialities.description AS specialitydescription
			FROM users
			LEFT JOIN athletes ON users.id = athletes.idUser AND users.type = "ATHLETE"
			LEFT JOIN goals AS agoals ON athletes.idGoal = agoals.id AND agoals.type = "ATHLETE"
			LEFT JOIN OLD_sports ON athletes.idSport = OLD_sports.id

			LEFT JOIN professionists ON users.id = professionists.idUser AND users.type = "PROFESSIONIST"
			LEFT JOIN goals AS pgoals ON professionists.idGoal = pgoals.id AND pgoals.type = "PROFESSIONIST"
			LEFT JOIN specialities ON professionists.idSpeciality = specialities.id`);
	},
};