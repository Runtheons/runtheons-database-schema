module.exports = (models) => {
	const { OlimpusRequest, Event } = models;

	OlimpusRequest.addHook("afterCreate", async (olimpusRequest, options) => {
		if (olimpusRequest.status == "INVITED") {
			await Event.create({
				idUser: olimpusRequest.idUserA,
				type: "OLIMPUSREQUEST_CREATE",
				value: olimpusRequest.idOlimpusRequest,
				new: JSON.stringify(olimpusRequest.dataValues),
			});
		} else {
			await Event.create({
				idUser: olimpusRequest.idUserB,
				type: "OLIMPUSREQUEST_CREATE",
				value: olimpusRequest.idOlimpusRequest,
				new: JSON.stringify(olimpusRequest.dataValues),
			});
		}
	});

	OlimpusRequest.addHook("afterUpdate", async (olimpusRequest, options) => {
		if (olimpusRequest.status == "CONNECT" && olimpusRequest._previousDataValues.status == "INVITED") {
			Event.create({
				idUser: olimpusRequest.idUserB,
				type: "OLIMPUSREQUEST_UPDATE",
				value: olimpusRequest.idOlimpusRequest,
				old: JSON.stringify(olimpusRequest._previousDataValues),
				new: JSON.stringify(olimpusRequest.dataValues),
			});
		}
		if (olimpusRequest.status == "CONNECT" && olimpusRequest._previousDataValues.status == "REQUESTED") {
			Event.create({
				idUser: olimpusRequest.idUserA,
				type: "OLIMPUSREQUEST_UPDATE",
				value: olimpusRequest.idOlimpusRequest,
				old: JSON.stringify(olimpusRequest._previousDataValues),
				new: JSON.stringify(olimpusRequest.dataValues),
			});
		}
		if (olimpusRequest.status == "REJECTED") {
			Event.create({
				idUser: olimpusRequest.idUserB,
				type: "OLIMPUSREQUEST_DELETE",
				value: olimpusRequest.idOlimpusRequest,
				old: JSON.stringify(olimpusRequest._previousDataValues),
				new: JSON.stringify(olimpusRequest.dataValues),
			});
		}
		if (olimpusRequest.status == "REFUSED" || olimpusRequest.status == "DELETED") {
			Event.create({
				idUser: olimpusRequest.idUserA,
				type: "OLIMPUSREQUEST_DELETE",
				value: olimpusRequest.idOlimpusRequest,
				old: JSON.stringify(olimpusRequest._previousDataValues),
				new: JSON.stringify(olimpusRequest.dataValues),
			});
		}
	});

};