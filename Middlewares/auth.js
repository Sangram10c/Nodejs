const { getUser } = require("../Service/auth");


async function restrictToLoggedinUserOnly(req, res, next) {
  let userUid = req.headers["authorization"];
  if (userUid) userUid = userUid.trim();

  if (!userUid) return res.redirect("/Login");
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) return res.redirect("/Login");

  req.user = user;
  next();
}

  async function checkAuth(req, res, next) {
    let userUid = req.headers["authorization"];
    if (userUid) userUid = userUid.trim();
  
    if (!userUid) {
      req.user = null;
      return next();
    }
  
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token);
    if (!user) {
      req.user = null;
      return next();
    }
  
    req.user = user;
    next();
  }


module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};