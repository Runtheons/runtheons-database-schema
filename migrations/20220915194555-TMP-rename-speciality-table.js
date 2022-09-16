"use strict";

module.exports = {
	up: async(queryInterface, Sequelize) => {
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
				users.address_name AS address_name,
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
				sports.idSport AS sportid,
				sports.description AS sportdescription,
				professionists.name AS pname,
				professionists.surname AS psurname,
				professionists.motto AS motto,
				professionists.stripeAccount AS stripeAccount,
				professionists.curriculum AS curriculum,
				professionists.workOnline AS workOnline,
				professionists.radius AS radius,
				pgoals.id AS pgoalid,
				pgoals.description AS pgoaldescription,
				specialities.idSpeciality AS specialityid,
				specialities.description AS specialitydescription
			FROM users
			LEFT JOIN athletes ON users.id = athletes.idUser AND users.type = "ATHLETE"
			LEFT JOIN goals AS agoals ON athletes.idGoal = agoals.id AND agoals.type = "ATHLETE"
			LEFT JOIN sports ON athletes.idSport = sports.idSport

			LEFT JOIN professionists ON users.id = professionists.idUser AND users.type = "PROFESSIONIST"
			LEFT JOIN goals AS pgoals ON professionists.idGoal = pgoals.id AND pgoals.type = "PROFESSIONIST"
			LEFT JOIN specialities ON professionists.idSpeciality = specialities.idSpeciality`);
		} catch (e) {
			console.log(e);
		}
		try {
			await queryInterface.sequelize.query(`ALTER VIEW getproducts AS
			SELECT 
				ssub.*,
				athnum.athletes,
				ath1.idUserAthlete AS athlete1idUser,
				ath1.photo AS athlete1photo,
				ath2.idUserAthlete AS athlete2idUser,
				ath2.photo AS athlete2photo,
				ath3.idUserAthlete AS athlete3idUser,
				ath3.photo AS athlete3photo,

				getusers.idUser AS userprofessionist_idUser,
				getusers.id AS userprofessionist_id,
				getusers.email AS userprofessionist_email,
				getusers.password AS userprofessionist_password,
				getusers.status AS userprofessionist_status,
				getusers.idCustomer AS userprofessionist_idCustomer,
				getusers.type AS userprofessionist_type,
				getusers.position AS userprofessionist_position,
				getusers.address_name AS userprofessionist_address_name,
				getusers.photo AS userprofessionist_photo,
				getusers.cover AS userprofessionist_cover,
				getusers.sex AS userprofessionist_sex,
				getusers.bio AS userprofessionist_bio,
				getusers.dateBirth AS userprofessionist_dateBirth,
				getusers.phone AS userprofessionist_phone,
				getusers.dateCreation AS userprofessionist_dateCreation,
				getusers.lastUpdate AS userprofessionist_lastUpdate,
				getusers.aname AS userprofessionist_aname,
				getusers.asurname AS userprofessionist_asurname,
				getusers.agoalid AS userprofessionist_agoalid,
				getusers.agoaldescription AS userprofessionist_agoaldescription,
				getusers.sportid AS userprofessionist_sportid,
				getusers.sportdescription AS userprofessionist_sportdescription,
				getusers.pname AS userprofessionist_pname,
				getusers.psurname AS userprofessionist_psurname,
				getusers.stripeAccount AS userprofessionist_stripeAccount,
				getusers.curriculum AS userprofessionist_curriculum,
				getusers.motto AS userprofessionist_motto,
				getusers.workOnline AS userprofessionist_workOnline,
				getusers.radius AS userprofessionist_radius,
				getusers.pgoalid AS userprofessionist_pgoalid,
				getusers.pgoaldescription AS userprofessionist_pgoaldescription,
				getusers.specialityid AS userprofessionist_specialityid,
				getusers.specialitydescription AS userprofessionist_specialitydescription
			FROM (
				SELECT  
					sub.id AS idProduct, 
					sub.idUserProfessionist AS idUserProfessionist,
					sub.status AS status,
					sub.image AS image, 
					sub.title AS title, 
					sub.description AS description, 
					sub.speciality_id,
					sub.speciality_description,
					sub.price AS price, 
					sub.isVariable AS isVariable, 
					sub.howWork AS howWork, 
					sub.forWho AS forWho, 
					sub.whatInclude AS whatInclude, 
					sub.workOnline AS workOnline, 
					sub.dateCreation AS dateCreation, 
					sub.lastUpdate AS lastUpdate,
					AVG(sub.valutation) AS valutation,
					AVG(sub.serviceValutation) AS serviceValutation,
					AVG(sub.adviceService) AS adviceService,
					AVG(sub.comeBack) AS comeBack
				FROM (
					SELECT products.*, 
						reviews.serviceValutation + reviews.adviceService + reviews.comeBack AS valutation,
						reviews.serviceValutation,
						reviews.adviceService,
						reviews.comeBack,
						specialities.idSpeciality AS speciality_id,
						specialities.description AS speciality_description
					FROM products
					INNER JOIN specialities ON specialities.idSpeciality = products.idSpeciality
					LEFT JOIN estimates ON estimates.idProduct = products.id
					LEFT JOIN reviews ON estimates.id = reviews.idEstimate
				) AS sub
				GROUP BY sub.id
			) AS ssub
			LEFT JOIN (
				SELECT idProduct, COALESCE(COUNT(DISTINCT id), 0) AS athletes
				FROM estimates
				WHERE status IN ("PAID")
				GROUP BY idProduct
			) AS athnum ON athnum.idProduct = ssub.idProduct
			INNER JOIN getusers ON getusers.idUser = ssub.idUserProfessionist
			LEFT JOIN (
				SELECT 
					sath1.idUserAthlete,
					sath1.idProduct,
					users.photo
				FROM (
					SELECT DISTINCT estimates.idUserAthlete, estimates.idProduct, estimates.lastUpdate
					FROM estimates
					INNER JOIN products ON estimates.idProduct = products.id
					ORDER BY estimates.lastUpdate DESC
					LIMIT 0, 1
				) as sath1
				INNER JOIN users ON sath1.idUserAthlete = users.id
			) AS ath1 ON ath1.idProduct = ssub.idProduct
			LEFT JOIN (
				SELECT 
					sath2.idUserAthlete,
					sath2.idProduct,
					users.photo
				FROM (
					SELECT DISTINCT estimates.idUserAthlete, estimates.idProduct, estimates.lastUpdate
					FROM estimates
					INNER JOIN products ON estimates.idProduct = products.id
					ORDER BY estimates.lastUpdate DESC
					LIMIT 1, 1
				) as sath2
				INNER JOIN users ON sath2.idUserAthlete = users.id
			) AS ath2 ON ath2.idProduct = ssub.idProduct
			LEFT JOIN (
				SELECT 
					sath3.idUserAthlete,
					sath3.idProduct,
					users.photo
				FROM (
					SELECT DISTINCT estimates.idUserAthlete, estimates.idProduct, estimates.lastUpdate
					FROM estimates
					INNER JOIN products ON estimates.idProduct = products.id
					ORDER BY estimates.lastUpdate DESC
					LIMIT 2, 1
				) as sath3
				INNER JOIN users ON sath3.idUserAthlete = users.id
			) AS ath3 ON ath3.idProduct = ssub.idProduct`);
		} catch (e) {
			console.log(e);
		}
	},
	down: async(queryInterface, Sequelize) => {},
};