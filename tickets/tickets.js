// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../database');

// const Ticket = sequelize.define('Ticket', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   category: {
//     type: DataTypes.ENUM('asset', 'employee', 'other'),
//     defaultValue: 'other',
//   },
//   subcategory: {
//     type: DataTypes.ENUM('requestAllocation', 'requestDeallocation'),
//     defaultValue: 'requestAllocation',
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   createdBy: {
//     type: DataTypes.UUID,
//   },
//   assignedTo: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM('open', 'closed'),
//     defaultValue: 'open',
//   },
//   closedAt: {
//     type: DataTypes.DATE,
//   },
// });

// exports.Ticket = Ticket;
