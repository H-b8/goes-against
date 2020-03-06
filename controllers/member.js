const Member = require('../models/member');

module.exports = {
  profile,
  editMember,
  addLink,
  showLink,
  editLink,
  delLink,
  addSub,
  viewSubs,
  deleteSub
};

function profile(req, res, next) {
  Member.findById(req.params.id, function(err, member) {
    if (err) return next(err);
    res.render('member/profile', {
      member,
      user: req.user
    });
  });
}

function editMember(req, res) {
  Member.findByIdAndUpdate(req.params.id, req.body, function(err) {
    res.redirect(`/member/${req.params.id}`);
  })
}

function addLink(req, res, next) {
  console.log('wtffffffff')
  req.user.links.push(req.body);
  req.user.save(function(err) {
    res.redirect(`/member/${req.user._id}`);
  });
}

function showLink(req, res) {
  Member.findOne({'links._id': req.params.lid}, function(err, member) {
    const linkIdFromParams = req.params.lid;
    let link;
    member.links.forEach((linkFromDatabase)=>{
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
  Member.findById(req.params.mid, function(err, member) {
    const newLink = member.links.id(req.params.lid)
    for (let prop in req.body) {
      newLink[prop] = req.body[prop]
    }
    member.save(function(err) {
      res.redirect(`/member/${req.params.mid}`);
    })
  })
}

function delLink(req, res, next) {
  Member.findById(req.params.mid, function(err, member) {
    let x = member.links.id(req.params.lid)
    x.remove();
    member.save(function(err) {
      res.redirect(`/member/${req.params.mid}`);
    });
  });
}

function addSub(req, res, next) {
  Member.findById(req.params.id, function(err, member) {
    member.subscriptions.push(req.body);
    member.save(function (err) {
      res.redirect(`/member/${member._id}`);
    })
  })
}

function viewSubs(req, res) {
  Member.findById(req.params.id, function(err, member) {
    res.render('member/subs', {
      member,
      user: req.user
    })
  });
}

function deleteSub(req, res, next) {
  Member.findById(req.params.mid, function(err, member) {
    let x = member.subscriptions.id(req.params.sid)
    x.remove();
    member.save(function(err) {
      res.redirect(`/member/${req.params.mid}/subscribers`);
    });
  });
}