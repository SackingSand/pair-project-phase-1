'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

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
    modelName: "Owner"
  });


  Owner.associate = function(models) {
    Owner.hasMany(models.Site);
  };
  return Owner;
};