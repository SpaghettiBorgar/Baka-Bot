var mongoose = require("mongoose");

var Schemas = {};
var Models = {};

Schemas.guild = mongoose.Schema({
  id: String,
  bullies: [{userId: String, value: {type: Number, default: 0}}],
  settings: {
    prefix: {type: String, default: "b!"},
    language: {type: String, default: "en"}
  },
  cmdOptions: [{
    cmd: String,
    blacklist: {type: Boolean, default: false},
    perms: [{
      kind: Number,
      roleId: String,
      permissions: Number,
      userId: String
    }]
  }]
});

Schemas.user = mongoose.Schema({
  id: String,
  ignore: {type: Boolean, default: false}
});

exports.generate = function() {
  for (item in Schemas) {
    Models[item] = mongoose.model(item, Schemas[item]);
  }
}

exports.Schemas = Schemas;
exports.Models = Models;
