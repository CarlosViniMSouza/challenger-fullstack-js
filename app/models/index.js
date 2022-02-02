const dbConfiguration = require("../config/db.config.js");
const mongo = require("mongo");
const db = {};

db.mongo = mongo;
db.url = dbConfiguration.url;
db.tutorials = require("./tutorial.model.js")(mongo);

module.exports = db;