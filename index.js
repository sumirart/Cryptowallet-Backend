// IMPORT
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const configs = require("./src/configs/configs");
const routeNavigation = require("./src/routes");

// INITIATE AND USE
const app = express();
const port = configs.port;
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// ROUTING
app.use("/api/v1", routeNavigation);
app.use("*", (req, res) => {
  res.status(404).send("Not found!");
});

// START
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
