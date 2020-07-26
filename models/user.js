module.exports = function (sequelize, DataTypes) {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordhash: DataTypes.STRING,
  });
};
