'use strict';
const bcrypt = require(`bcrypt`);
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  const saltRounds = 10;
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
    password : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `password cannot be empty`,
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
    hooks : {
      beforeCreate : (hunter, options) => {
        hunter.password = bcrypt.hashSync(hunter.password, saltRounds)
        // bcrypt.compareSync(myPlaintextPassword, hash);
      }
    },
    sequelize,
    modelName : `FossilHunter`
    
  });
  FossilHunter.associate = function(models) {
    // associations can be defined here
    FossilHunter.belongsToMany(models.ExcavationSite, { through : `Request`})
  };
  return FossilHunter;
};