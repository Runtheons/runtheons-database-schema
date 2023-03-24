module.exports = (models) => {
	const { OlimpusRequest, User } = models;

	OlimpusRequest.owner = OlimpusRequest.belongsTo(User, {
		foreignKey: 'idUserA',
		as: 'owner',
		timestamps: false
	});

	OlimpusRequest.user = OlimpusRequest.belongsTo(User, {
		foreignKey: 'idUserB',
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