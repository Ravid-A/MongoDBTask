const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const getDBUri = () => {
  const { DB_HOST, DB_PORT, DB_NAME } = process.env;
  return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
};

const run = async () => {
  try {
    const port = process.env.PORT || "3000";
    await mongoose.connect(getDBUri());
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  } catch (err) {
    console.log(`FAILED TO START: ${err}`);
  }
};

run();

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
