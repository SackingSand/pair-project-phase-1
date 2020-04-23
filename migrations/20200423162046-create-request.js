'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hunter_id: {
        type: Sequelize.INTEGER,
        references : {
          model : `FossilHunters`,
          id : `id`
        },
        onUpdate : `cascade`,
        onDelete : `cascade`
      },
      site_id: {
        type: Sequelize.INTEGER,
        references : {
          model : `ExcavationSites`,
          id : `id`
        },
        onUpdate : `cascade`,
        onDelete : `cascade`
      },
      status: {
        type: Sequelize.STRING,
        defaultValues: "pending"
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
    return queryInterface.dropTable('Requests');
  }
};