const Member = require('../models/member');
const Subscriber = require('../models/subscriber');

module.exports = {
	readMember,
	updateMember,
	createLink,
	readLink,
	updateLink,
	deleteLink
};

// READ ONE MEMBER
async function readMember(req, res) {
	Member.findById(req.params.memberId, function (err, member) {
		if (err) return next(err);
		res.render('member/profile', {
			member,
			user: req.user
		});
	});

	// try {
	// 	const member = await Member.findById(req.params.memberId);
	// 	res.status(200).json(member);
	// } catch (err) {
	// 	res.status(404).send('404: USER NOT FOUND');
	// }
};

// UPDATE MEMBER
async function updateMember(req, res) {
	try {
		const existingUser = await Member.findOne({ username: req.body.username });

		if (!req.body.username || (req.body.username && !existingUser)) {
			await Member.findByIdAndUpdate(req.params.memberId, req.body);
			const updatedUser = Member.findById(req.params.memberId);
			res.status(200).json(updatedUser);
		} else if (req.body.username && existingUser) {
			res.send('USERNAME TAKEN');
		}
	} catch (err) {
		res.status(500).send('500: ERROR UPDATING MEMBER PROFILE');
	}

	// Member.findByIdAndUpdate(req.params.id, req.body, function (err) {
	// 	res.redirect(`/member/${req.params.id}`);
	// });
};

// CREATE LINK
async function createLink(req, res) {
	try {
		await req.user.links.push(req.body);
		// const user = await Member.findById(req.user._id);
		const user = await req.user;
		res.status(200).json(user);
	} catch (err) {
		res.status(500).send('500: ERROR ADDING NEW LINK');
	}

	// req.user.save(function (err) {
	// 	res.redirect(`/member/${req.user._id}`);
	// });
};

// SHOW EDIT LINK PAGE
async function readLink(req, res) {
	Member.findOne({ 'links._id': req.params.linkId }, function (err, member) {
		const linkIdFromParams = req.params.linkId;
		let link;

		member.links.forEach((linkFromDatabase) => {
			if (linkFromDatabase._id == linkIdFromParams) {
				link = linkFromDatabase
			}
		})

		res.render('member/link', {
			member,
			user: req.user,
			link
		})
	});
}

// UPDATE LINK
async function updateLink(req, res) {
	// Member.findById(req.params.mid, function (err, member) {
	// 	const newLink = member.links.id(req.params.lid)
	// 	for (let prop in req.body) {
	// 		newLink[prop] = req.body[prop]
	// 	}
	// 	member.save(function (err) {
	// 		res.redirect(`/member/${req.params.mid}`);
	// 	})
	// })

	try {
		const member = await req.user;
		const updatedLink = await member.links.id(req.params.linkId);
		for (let prop in req.body) updatedLink[prop] = await req.body[prop];
		res.status(200).json(member);
	} catch (err) {
		res.status(500).send('500: ERROR UPDATING LINK');
	}
}

function deleteLink(req, res, next) {
	Member.findById(req.params.mid, function (err, member) {
		let x = member.links.id(req.params.lid)
		x.remove();
		member.save(function (err) {
			res.redirect(`/member/${req.params.mid}`);
		});
	});
}