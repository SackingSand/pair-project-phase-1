'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Requests", "FossilHunterId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "FossilHunters",
        key: "id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
    .then(() => {
      return queryInterface.addColumn("Requests", "SiteId", {
        type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Sites",
        key: "id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Requests", "FossilHunterId")
    .then(() => {
      return queryInterface.removeColumn("Requests", "SiteId")
    })
  }
};
