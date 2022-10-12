'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Member extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Member.belongsToMany(models.Trip, {
				foreignKey: 'memberId',
				through: 'Subscriptions'
			})
			Member.hasMany(models.Photo, {
				foreignKey: 'photoableId',
				constraints: false,
				scope: {
					photoableType: 'member'
				}
			});
		}
	}
	Member.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
		password: DataTypes.STRING,
		gender: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Member',
	});
	return Member;
};