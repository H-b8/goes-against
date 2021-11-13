const Member = require('../models/member');
const Subscriber = require('../models/subscriber');

module.exports = {
	readOne: memberProfile,
	update: updateMember,
	addLink,
	showLink,
	editLink,
	delLink
};

// SHOW PROFILE
async function memberProfile(req, res) {
	// Member.findById(req.params.id, function (err, member) {
	// 	if (err) return next(err);
	// 	res.render('member/profile', {
	// 		member,
	// 		user: req.user
	// 	});
	// });

	try {
		const member = await Member.findById(req.params.memberId);
		res.status(200).json(member);
	} catch (err) {
		res.status(404).send('404: USER NOT FOUND');
	}
};

// EDIT PROFILE
async function updateMember(req, res) {
	// if username being updated look for username
	// if already exists, send error

	try {
		const existingUser = await Member.findOne({ username: req.body.username });

		if (req.body.username && !existingUser) {
			console.log(req.body.username, " available");
		} else if (req.body.username && existingUser) {
			console.log(req.body.username, " unavailable");
		}

		const updatedUser = await Member.findById(req.params.id)

		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).send('500: ERROR UPDATING MEMBER PROFILE');
	}

	// Member.findByIdAndUpdate(req.params.id, req.body, function (err) {
	// 	res.redirect(`/member/${req.params.id}`);
	// });
};

function addLink(req, res, next) {
	req.user.links.push(req.body);
	req.user.save(function (err) {
		res.redirect(`/member/${req.user._id}`);
	});
}

// ?????
function showLink(req, res) {
	Member.findOne({ 'links._id': req.params.lid }, function (err, member) {
		const linkIdFromParams = req.params.lid;
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

function editLink(req, res) {
	Member.findById(req.params.mid, function (err, member) {
		const newLink = member.links.id(req.params.lid)
		for (let prop in req.body) {
			newLink[prop] = req.body[prop]
		}
		member.save(function (err) {
			res.redirect(`/member/${req.params.mid}`);
		})
	})
}

function delLink(req, res, next) {
	Member.findById(req.params.mid, function (err, member) {
		let x = member.links.id(req.params.lid)
		x.remove();
		member.save(function (err) {
			res.redirect(`/member/${req.params.mid}`);
		});
	});
}