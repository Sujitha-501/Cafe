'use strict'

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    tableName: 'category'
  });
    Model.associate = function (models) {
    this.products = this.hasMany(models.products)
  };
  return Model;
}
