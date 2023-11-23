'use strict'

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    }
  },{
    tableName: 'products'
  });
  Model.associate = function (models) {
    this.categoryId = this.belongsTo(models.category);
  };
  return Model;
}
