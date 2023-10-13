'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      queryInterface.addColumn('users', 'verificationToken', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'verifyStatus', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      // Add more columns as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return Promise.all([
      queryInterface.removeColumn('users', 'verificationToken'),
      queryInterface.removeColumn('users', 'verifyStatus'),
      // Remove more columns as needed
    ]);
  }
};
