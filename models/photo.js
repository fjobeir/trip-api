'use strict';

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Photo extends Model {
		getPhotoable(options) {
			if (!this.photoableType) return Promise.resolve(null);
			const mixinMethodName = `get${uppercaseFirst(this.photoableType)}`;
			return this[mixinMethodName](options);
		}
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Photo.belongsTo(models.Member, { foreignKey: 'photoableId', constraints: false });
			Photo.belongsTo(models.Trip, { foreignKey: 'photoableId', constraints: false });
		}
	}
	Photo.init({
		file: DataTypes.STRING,
		photoableId: DataTypes.INTEGER,
		photoableType: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Photo',
	});
	Photo.addHook("afterFind", findResult => {
		if (!Array.isArray(findResult)) findResult = [findResult];
		for (const instance of findResult) {
			if (instance.photoableType === "trip" && instance.Trip !== undefined) {
				instance.photoable = instance.Trip;
			} else if (instance.photoableType === "member" && instance.Member !== undefined) {
				instance.photoable = instance.Member;
			}
			// To prevent mistakes:
			delete instance.Trip;
			delete instance.dataValues.Trip;
			delete instance.Member;
			delete instance.dataValues.Member;
		}
	});
	return Photo;
};