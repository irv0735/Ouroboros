const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyLog extends Model {}

DailyLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    journal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emotion: {
      type: DatatTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dailyLog',
  }
);

module.exports = DailyLog;