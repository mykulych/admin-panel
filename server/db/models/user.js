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
        validate: {
          notNull: { args: true, msg: "You must enter Phone Number" },
          len: { args: [11, 11], msg: "Phone Number is invalid" },
          isInt: { args: true, msg: "You must enter Phone Number" },
        },
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
