const { INTEGER } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Cocktail = sequelize.define("Cocktail", {
    text: DataTypes.STRING,
    saveId: value.INTEGER,
    complete: DataTypes.BOOLEAN
  });
  return Cocktail;
};
