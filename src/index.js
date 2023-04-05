const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");
async function main() {
  await db.connect();
}
main();
