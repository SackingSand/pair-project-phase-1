'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExcavationSites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site_name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.INTEGER
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references : {
          model : `Owners`,
          id : `id`
        },
        onUpdate : `cascade`,
        onDelete : `cascade`
      },
      email: {
        type: Sequelize.STRING
      },
      requirement: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ExcavationSites');
  }
};