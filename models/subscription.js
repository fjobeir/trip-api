'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.hasMany(models.Payment, {
        foreignKey: 'subscriptionId'
      })
    }
  }
  Subscription.init({
    memberId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
    updatedAt: false
  });
  return Subscription;
};