const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ActivityLog extends Model {}

ActivityLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    daily_log_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'dailyLog',
        key: 'id',
        unique: false
      }
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'activity',
        key: 'id',
        unique: false
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        moedl: 'user',
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
    modelName: 'activityLog',
  }
);

module.exports = ActivityLog;