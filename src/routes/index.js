const noteRoutes = require("./NoteRoutes");
const authRoutes = require("./AuthRoutes");
module.exports = (app) => {
  app.get("/status", (req, res, next) => {
    res.send("OK");
  });
  noteRoutes(app);
  authRoutes(app);
};
