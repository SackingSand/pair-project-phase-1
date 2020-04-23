'use strict';
const bcrypt = require(`bcrypt`);
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  const saltRounds = 10;
  class FossilHunter extends Model {}

  FossilHunter.init({
    first_name: {
      type : DataTypes.STRING,
      validate : {
        isAlpha : {
          msg : `first name can only contain letters`,
        },
        notEmpty : {
          msg : `first name cannot be empty`,
        },
        len : {
          args : [2,225],
          msg : `first name requires at least 2 characters`
        }
      }
    },
    last_name: {
      type : DataTypes.STRING,
      validate : {
        isAlpha : {
          msg : `last name can only contain letters`,
        },
        notEmpty : {
          msg : `last name cannot be empty`,
        },
        len : {
          args : [2,225],
          msg : `last name requires at least 2 characters`
        }
      }
    },
    password : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `password cannot be empty`,
        },
        len : {
          args : [4,8],
          msg : `Password only accepts 4 to 8 characters`
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
      },
      unique: {
        msg : `This email is already registered`
      }
    },
    hunting_experience: DataTypes.INTEGER,
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
    FossilHunter.belongsToMany(models.Site, { through : models.Request})
  };
  return FossilHunter;
};