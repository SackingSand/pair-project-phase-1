'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Owner extends Model {}

  Owner.init({
    name: DataTypes.STRING,
    sites_owned: DataTypes.INTEGER
  }, 
  { 
    sequelize, 
    modelName : `Owner`
  })

  Owner.associate = function(models) {
    // associations can be defined here
  };
  return Owner;
};