const dotenv = require("dotenv");
const express = require("express");
const db = require("./db");
dotenv.config();
const routes = require("./routes");

async function main() {
  await db.connect();

  const app = express();

  app.use(express.json());

  routes(app);

  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
}
main();

//"express=>controller=>services=>model" voici le deroulement logique d'une application et pas le contraire
