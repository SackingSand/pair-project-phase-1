'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class Site extends Model {}

  Site.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Site name can\'t be empty"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Site address can\'t be empty"
        }
      }
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Site area can\'t be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Site email can\'t be empty"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    requirement: {
      type: DataTypes.INTEGER
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Owners",
        key: "id"
      },
      onUpdate:'cascade',
      onDelete: 'cascade'
    }
  }, {
    hooks: {
      beforeCreate(site, option) {
        const { models } = sequelize;
        console.log(site.OwnerId);
        return models.Owner.findByPk(site.OwnerId)
        .then(owner => {
          owner.site_owned++;

          return models.Owner.update({
            site_owned: owner.site_owned
          },{
            where: {
              id: site.OwnerId
            }
          })
        })
        .catch(err => {
          throw new Error(err.message)
        })
      }
    },
    sequelize,
    modelName: "Site"
  });


  Site.associate = function(models) {
    Site.belongsTo(models.Owner);
  };
  return Site;
};