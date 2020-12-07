const { INTEGER } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Cocktail = sequelize.define("Cocktail", {
    name: {
    type: DataTypes.STRING,
    allowNull: false
  },
    saveId: {
    type: DataTypes.STRING,
    allowNull: false
    }
  });
  return Cocktail;
};
