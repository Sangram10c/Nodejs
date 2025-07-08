const { getUser } = require("../Service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.headers["authorization"];

  if (!userUid) return res.redirect("/Login");
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) return res.redirect("/Login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
 const userUid = req.headers["authorization"];

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

 

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};