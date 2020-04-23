'use strict';
module.exports = (sequelize, DataTypes) => {
  const FossilHunter = sequelize.define('FossilHunter', {
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    start_hunt_year: DataTypes.INTEGER,
    team_size: DataTypes.INTEGER
  }, {});
  FossilHunter.associate = function(models) {
    // associations can be defined here
  };
  return FossilHunter;
};