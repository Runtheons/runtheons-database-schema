SELECT
    users.idUser AS idUser,
    users.idUser AS id,
    loginmethods.email AS email,
    loginmethods.password AS password,
    users.status AS status,
    users.idCustomer AS idCustomer,
    IF(users.type="ATHLETE", 1, 2) AS userType,
    users.type AS type,
    Point(positions.latitude,positions.longitude) AS position,
    positions.addressName AS address_name,
    users.photo AS photo,
    users.cover AS cover,
    IF(users.sex="MALE","M",IF(users.sex="FEMALE","F",users.sex)) AS sex,
    users.biography AS bio,
    users.dateBirth AS dateBirth,
    users.phone AS phone,
    users.dateCreation AS dateCreation,
    users.lastUpdate AS lastUpdate,
    users.name AS aname,
    users.surname AS asurname,
    subagoals.idGoal AS agoalid,
    subagoals.description AS agoaldescription,
    subsports.idSport AS sportid,
    subsports.description AS sportdescription,
    users.name AS pname,
    users.surname AS psurname,
    users.motto AS motto,
    users.stripeConnectAccount AS stripeAccount,
    users.workOnline AS workOnline,
    positions.radius AS radius,
    subpgoals.idGoal AS pgoalid,
    subpgoals.description AS pgoaldescription,
    subspecialities.idSpeciality AS specialityid,
    subspecialities.description AS specialitydescription
FROM users
LEFT JOIN positions ON users.idPosition = positions.idPosition
LEFT JOIN loginmethods ON loginmethods.idUser = users.idUser
LEFT JOIN (
    SELECT DISTINCT usersgoals.idUser, goals.*
    FROM usersgoals
    INNER JOIN goals ON goals.idGoal = usersgoals.idGoal
    WHERE type = "ATHLETE"
    GROUP BY idUser
) AS subagoals ON subagoals.idUser = users.idUser
LEFT JOIN (
    SELECT DISTINCT userssports.idUser, sports.*
    FROM userssports
    INNER JOIN sports ON sports.idSport = userssports.idSport
    GROUP BY idUser
) AS subsports ON subsports.idUser = users.idUser
LEFT JOIN (
    SELECT DISTINCT usersgoals.idUser, goals.*
    FROM usersgoals
    INNER JOIN goals ON goals.idGoal = usersgoals.idGoal
    WHERE type = "PROFESSIONIST"
    GROUP BY idUser
) AS subpgoals ON subpgoals.idUser = users.idUser
LEFT JOIN (
    SELECT DISTINCT usersspecialities.idUser, specialities.*
    FROM usersspecialities
    INNER JOIN specialities ON specialities.idSpeciality = usersspecialities.idSpeciality
    GROUP BY idUser
) AS subspecialities ON subspecialities.idUser = users.idUser