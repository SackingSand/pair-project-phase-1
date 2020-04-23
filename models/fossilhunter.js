'use strict';
const bcrypt = require(`bcrypt`);
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  const saltRounds = 10;
  
  class FossilHunter extends Model {
    get fullName() {
      return `${this.first_name} ${this.last_name}`
    }
  }

  FossilHunter.init({
    first_name: {
      type : DataTypes.STRING,
      validate : {
        isAlpha : {
          msg : `name can only contain letters`,
        },
        notEmpty : {
          msg : `password cannot be empty`,
        }
      }
    },
    last_name: {
      type : DataTypes.STRING,
      validate : {
        isAlpha : {
          msg : `name can only contain letters`,
        },
        notEmpty : {
          msg : `password cannot be empty`,
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