module.exports = (app) => {
  app.get("/status", (req, res, next) => {
    res.send("OK");
  });
};
