const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat } = require("./../utils");

module.exports = (sequelize, models) => {
	class User extends Model {

		async setSports(sports) {
			let old = this.dataValues;
			let r = await this._options.include
				.find(ass => ass.association.combinedName == "userssports")
				.association
				.set(this, sports);

			await this.reload();

			this.sequelize.models.Event.create({
				idUser: this.idUser,
				type: "USER_UPDATE_SPORTS",
				value: this.idUser,
				old: JSON.stringify(old),
				new: JSON.stringify(this.dataValues),
			});

			return r;
		}

		async setGoals(goals) {
			let old = this.dataValues;
			let r = await this._options.include
				.find(ass => ass.association.combinedName == "usersgoals")
				.association
				.set(this, goals);

			await this.reload();

			this.sequelize.models.Event.create({
				idUser: this.idUser,
				type: "USER_UPDATE_GOALS",
				value: this.idUser,
				old: JSON.stringify(old),
				new: JSON.stringify(this.dataValues),
			});

			return r;
		}

		async setSpecialities(specialities) {
			let old = this.dataValues;
			let r = await this._options.include
				.find(ass => ass.association.combinedName == "usersspecialities")
				.association
				.set(this, specialities);

			await this.reload();

			this.sequelize.models.Event.create({
				idUser: this.idUser,
				type: "USER_UPDATE_SPECIALITIES",
				value: this.idUser,
				old: JSON.stringify(old),
				new: JSON.stringify(this.dataValues),
			});

			return r;
		}

	}

	User.init({
		idUser: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		status: {
			type: DataTypes.ENUM([
				"NOT ACTIVE",
				"SEMI ACTIVE",
				"ACTIVE",
				"BANNED",
				"DELETED",
			]),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM(["ATHLETE", "PROFESSIONIST"]),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		dateBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		age: {
			type: DataTypes.VIRTUAL,
			get() {
				var today = new Date();
				var birthDate = new Date(this.dateBirth);
				var age = today.getFullYear() - birthDate.getFullYear();
				var m = today.getMonth() - birthDate.getMonth();
				if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
					age--;
				}
				return age;
			}
		},
		sex: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: "NOT SPECIFIED",
			references: {
				model: models.Sex,
				key: 'idSex'
			}
		},
		photo: {
			type: DataTypes.STRING(250),
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING(25),
			allowNull: true,
		},
		cover: {
			type: DataTypes.STRING(250),
			allowNull: true,
		},
		title: {
			type: DataTypes.STRING(150),
			allowNull: true,
			defaultValue: null,
		},
		biography: {
			type: DataTypes.STRING(5000),
			allowNull: true,
		},
		idCustomer: {
			type: DataTypes.STRING(150),
			allowNull: true,
		},
		motto: {
			type: DataTypes.STRING(250),
			allowNull: true,
		},
		stripeConnectAccount: {
			type: DataTypes.STRING(150),
			allowNull: true,
		},
		workOnline: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		dateCreation: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue('dateCreation');
				return dateFormat(rawValue);
			}
		},
		lastUpdate: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				const rawValue = this.getDataValue('lastUpdate');
				return dateFormat(rawValue);
			}
		},
	}, {
		sequelize,
		createdAt: "dateCreation",
		updatedAt: "lastUpdate",
		tableName: "users",
	});

	return User;
};