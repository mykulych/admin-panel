const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DIALECT,
    logging: false,

    pool: {
      max: 80,
      min: 0,
    },
  },
);

require("./models").init(sequelize);

module.exports = sequelize;
