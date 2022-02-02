const dbConfiguration = require("../config/db.config.js");
const mongo = require("mongoose");
mongo.Promise = global.Promise;

const db = {};

db.mongo = mongo;
db.url = dbConfiguration.url;
db.tutorials = require("./tutorial.model")(mongo);

module.exports = db;