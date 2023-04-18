const { SessionModel } = require("../db");

const requireSession = async (req, res, next) => {
  const sessionToken = req.headers["x-session-token"];
  const session = await SessionModel.findOne({
    token: sessionToken,
  });
  if (!session) {
    return res.json({
      message: "Invalid Session Token",
    });
  }
  const hasExpired = session.hasExpired();
  if (hasExpired)
    return res.json({
      message: "Session Token Expired",
    });
  res.locals.session = session;
  next();
};

module.exports = {
  requireSession,
};
