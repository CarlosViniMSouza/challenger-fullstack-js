const dbConfiguration = require("../config/db.config.js");
const mongo = require("mongoose");
mongo.Promise = global.Promise;

const db = {};

db.mongo = mongo;
db.url = dbConfiguration.url;
db.tutorials = require("./tutorial.model")(mongo);
db.assets = require("./asset.model")(mongo);
db.users = require("./user.model")(mongo);
db.units = require("./unit.model")(mongo);

module.exports = db;