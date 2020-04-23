'use strict';
const bcrypt = require(`bcrypt`);
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;
  const saltRounds = 10;

  class Owner extends Model {
    get fullName() {
      return `${this.first_name} ${this.last_name}`;
    }
  }

  Owner.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Firstname can\'t be empty"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Lastname can\'t be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email can\'t be empty"
        },
        isEmail : {
          msg : `re-check your email formatting`,
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password can\'t be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address can\'t be empty"
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^0\d{11}/,
          msg: "Invalid phone number format"
        }
      }
    },
    site_owned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: "Owner",
    hooks : {
      beforeCreate : (hunter, options) => {
        hunter.password = bcrypt.hashSync(hunter.password, saltRounds)
        // bcrypt.compareSync(myPlaintextPassword, hash);
      }
    }
  });


  Owner.associate = function(models) {
    Owner.hasMany(models.Site);
  };
  return Owner;
};