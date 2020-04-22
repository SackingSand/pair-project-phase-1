'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class FossilHunter extends Model {}

  FossilHunter.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        isAlpha : {
          msg : `name can only contain letters`,
        }
      }
    },
    phone_number: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          msg : `re-check your email formatting`,
        }
      }
    },
    start_hunt_year: DataTypes.STRING,
    team_size: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName : `FossilHunter`
  });
  FossilHunter.associate = function(models) {
    // associations can be defined here
    FossilHunter.belongsToMany(models.ExcavationSite, { through : `Request`})
  };
  return FossilHunter;
};