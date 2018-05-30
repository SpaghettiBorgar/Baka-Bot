var mongoose = require("mongoose");

var Schemas = {};
var Models = {};

Schemas.guild = mongoose.Schema({
  _id: String,
  bullies: [{_id: String, value: {type: Number, default: 0}}],
  settings: {
    prefix: {type: String, default: "b!"},
    language: {type: String, default: "en"}
  },
  cmdOptions: [{
    _id: String,
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
  _id: String,
  ignore: {type: Boolean, default: false}
});

exports.compile = function() {
  for (item in Schemas) {
    exports[item] = mongoose.model(item, Schemas[item]);
  }
}
