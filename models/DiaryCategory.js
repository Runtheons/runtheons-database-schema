const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
	class DiaryCategory extends Model { }

	DiaryCategory.init({
		idDiaryCategory: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
	}, {
		sequelize,
		indexes: [{
			unique: true,
			fields: ["idUser", "description"],
		}],
		createdAt: false,
		updatedAt: false,
		tableName: "diarycategories",
	});

	return DiaryCategory;
};