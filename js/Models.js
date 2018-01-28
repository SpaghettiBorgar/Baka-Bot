var mongoose = require("mongoose");

const Schemas = {};
const Models = {};
Schemas.guild = mongoose.Schema({
  id: String,
  name: String
});
Schemas.user = mongoose.Schema({
  id: String,
  name: String,
  bullypoints: [{
    guild: Schemas.guild,
    value: Number
  }]
});

exports.generate = function() {
  for (item in Schemas) {
    Models[item] = mongoose.model(item, Schemas[item]);
  }
}

exports.Schemas = Schemas;
exports.Models = Models;
