const { Sequelize, DataTypes, Model } = require("sequelize");
const { dateFormat, findTargetUser } = require("./../utils");

module.exports = (sequelize) => {
	class Target extends Model {
		static TYPE_AND = 'AND';
		static TYPE_OR = 'OR';

		async setSports(sports) {
			let old = this.dataValues;
			let r = await this._options.include
				.find(ass => ass.association.combinedName == "targetssports")
				.association
				.set(this, sports);

			await this.reload();

			const user = await findTargetUser(this.sequelize.models, this)
			if (user != null) {
				this.sequelize.models.Event.create({
					idUser: user.idUser,
					type: "TARGET_UPDATE_SPORTS",
					value: this.idTarget,
					old: JSON.stringify(old),
					new: JSON.stringify(this.dataValues),
				});
			}
			return r;
		}

		async setSexs(sexs) {
			let old = this.dataValues;
			let r = await this._options.include
				.find(ass => ass.association.combinedName == "targetssexs")
				.association
				.set(this, sexs);

			await this.reload();

			const user = await findTargetUser(this.sequelize.models, this)
			if (user != null) {
				this.sequelize.models.Event.create({
					idUser: user.idUser,
					type: "TARGET_UPDATE_SEXS",
					value: this.idTarget,
					old: JSON.stringify(old),
					new: JSON.stringify(this.dataValues),
				});
			}
			return r;
		}

		async setPositions(positions) {
			let old = this.dataValues;
			let r = await this._options.include
				.find(ass => ass.association.combinedName == "targetspositions")
				.association
				.set(this, positions);

			await this.reload();

			const user = await findTargetUser(this.sequelize.models, this)
			if (user != null) {
				this.sequelize.models.Event.create({
					idUser: user.idUser,
					type: "TARGET_UPDATE_POSITIONS",
					value: this.idTarget,
					old: JSON.stringify(old),
					new: JSON.stringify(this.dataValues),
				});
			}
			return r;
		}
	}

	Target.init({
		idTarget: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.ENUM(["AND", "OR"]),
			defaultValue: "OR",
			allowNull: false,
		},
		minAge: {
			type: DataTypes.INTEGER,
			defaultValue: 13,
			allowNull: false,
		},
		maxAge: {
			type: DataTypes.INTEGER,
			defaultValue: 40,
			allowNull: false,
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
		tableName: "targets",
	});

	return Target;
};