const noteRoutes = require("./NoteRoutes");
module.exports = (app) => {
  app.get("/status", (req, res, next) => {
    res.send("OK");
  });
  noteRoutes(app);
};
