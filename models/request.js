'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Request extends Model {}

  Request.init({
    hunter_id: DataTypes.INTEGER,
    site_id: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName : `Request` 
  })

  Request.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.FossilHunter);
    Request.belongsTo(models.ExcavationSite);
  };
  return Request;
};