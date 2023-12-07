const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      surname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number_phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      height: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      weight: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
    }
  );
