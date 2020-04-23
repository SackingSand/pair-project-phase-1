'use strict';
const owners = require('../data_source/owner.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    owners.map(owner => {
      owner.createdAt = new Date();
      owner.updatedAt = new Date();

      return owner;
    });

    return queryInterface.bulkInsert("Owners", owners, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Owners", null, {});
  }
};
