'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Sites", "OwnerId", {
      type:Sequelize.INTEGER,
      references: {
        model: "Owners",
        key: "id"
      },
      onUpdate:'cascade',
      onDelete: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Sites", "OwnerId");
  }
};
