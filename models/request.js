'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Request extends Model {}

  Request.init({
    status: {
      type: DataTypes.STRING
    },
    FossilHunterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "FossilHunters",
        key: "id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    SiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sites",
        key: "id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    hooks: {
      beforeCreate(request) {
        if(!request.status) {
          request.status = "pending"
        }
      }
    },
    sequelize,
    modelName: "Request"
  });
  Request.associate = function(models) {
    Request.belongsTo(models.Site);
    Request.belongsTo(models.FossilHunter);
  };
  return Request;
};