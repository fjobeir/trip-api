'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Payment.belongsTo(models.Subscription, {
				foreignKey: 'subscriptionId'
			})
		}
	}
	Payment.init({
		subscriptionId: DataTypes.INTEGER,
		amount: DataTypes.INTEGER,
		date: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Payment',
	});
	return Payment;
};