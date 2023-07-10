const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./database");
const globalStatController = require("./controller/global-stat.controller");
// const KeyValueControlloer = require('./controller/key-value.controller');
const keyValueController = require("./controller/key-value.controller");
// const wrapWithErrorHandler = require('./util');

async function launchServer() {
  const app = express();

  app.use(bodyParser.json());
  app.get("/", (req, res) => {
    res.json({ message: "hello" });
  });
  try {
    await sequelize.sync();
    console.log("Database is ready!");
  } catch (error) {
    console.log("Unable to connect to the database");
    console.log(error);
    process.exit(1);
  }

  app.get("/global-stats", globalStatController.getAll);
  app.post("/global-stats", globalStatController.insertOrUpdate);
  app.delete("/global-stats", globalStatController.remove);

  app.get("/key-value", keyValueController.get);
  app.post("/key-value", keyValueController.insertOrUpdate);
  app.delete("/key-value", keyValueController.remove);

  const port = 8080;
  app.listen(port, () => {
    console.log(`server run ${port}`);
  });
}

launchServer();
