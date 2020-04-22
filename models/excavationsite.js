'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class ExcavationSite extends Model {}

  ExcavationSite.init({
    site_name: DataTypes.STRING,
    location: DataTypes.STRING,
    area: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    requirement: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName : `ExcavationSite`
  });
  ExcavationSite.associate = function(models) {
    // associations can be defined here
    ExcavationSite.belongsToMany(models.FossilHunter, { through : `Request`})
    ExcavationSite.belongsTo(models.Owner)
  };
  return ExcavationSite;
};