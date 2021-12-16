const { Pool } = require("pg");
const configs = require("./configs");

const pool = new Pool({
  host: configs.db.host,
  user: configs.db.user,
  password: configs.db.password,
  database: configs.db.database,
  port: configs.db.port,
});

module.exports = pool;
