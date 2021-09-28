const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Progress extends Model {}

Progress.init(
  {
    exercise: {
      type: DataTypes.INTEGER,
      
    },
    meditation: {
      type: DataTypes.INTEGER,
    },
    sleep: {
      type: DataTypes.INTEGER,
    },
    knowledge: {
      type: DataTypes.INTEGER,
    },
    connection: {
      type: DataTypes.INTEGER,
    },
    diet: {
      type: DataTypes.INTEGER,
    },
    creativity: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "activity",
  }
);

module.exports = Progress;
