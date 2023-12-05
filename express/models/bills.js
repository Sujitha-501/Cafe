'use strict'

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('bills', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    modified: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  },{
    tableName: 'bills'
  });
  return Model;
}