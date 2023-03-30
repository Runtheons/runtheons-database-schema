module.exports = (models) => {
	const { OlimpusRequest, User } = models;

	OlimpusRequest.owner = OlimpusRequest.belongsTo(User, {
		foreignKey: 'idUserOwner',
		as: 'owner',
		timestamps: false
	});

	OlimpusRequest.user = OlimpusRequest.belongsTo(User, {
		foreignKey: 'idUser',
		as: 'user',
		timestamps: false
	});

	OlimpusRequest.addScope("defaultScope", {
		include: [{
			association: OlimpusRequest.owner,
		}, {
			association: OlimpusRequest.user,
		}]
	});

	OlimpusRequest.addScope("invited", {
		where: {
			status: "INVITED"
		}
	});

	OlimpusRequest.addScope("requested", {
		where: {
			status: "REQUESTED"
		}
	});

	OlimpusRequest.addScope("connect", {
		where: {
			status: "CONNECT"
		}
	});

}