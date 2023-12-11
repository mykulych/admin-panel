const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  dialect: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialectOptions: {
    encrypt: true,
    ssl : {
      rejectUnauthorized: true
    }
  },
})

require("./models").init(sequelize);

module.exports = sequelize;
