'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Request extends Model {}

  Request.init({
    status: {
      type: DataTypes.STRING,
      defaultValues: "pending"
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
    sequelize,
    modelName: "Request"
  });
  Request.associate = function(models) {
    Request.belongsTo(models.Site);
    Request.belongsTo(models.FossilHunter);
  };
  return Request;
};