"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("sports", "OLD_sports");
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {
		try {
			await queryInterface.renameTable("OLD_sports", "sports");
		} catch (e) {
			console.log(e);
		}
		try {
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
			LEFT JOIN sports ON athletes.idSport = sports.id

			LEFT JOIN professionists ON users.id = professionists.idUser AND users.type = "PROFESSIONIST"
			LEFT JOIN goals AS pgoals ON professionists.idGoal = pgoals.id AND pgoals.type = "PROFESSIONIST"
			LEFT JOIN specialities ON professionists.idSpeciality = specialities.id`);
		} catch (e) {
			console.log(e);
		}
	},
};