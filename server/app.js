require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const cors = require("cors")
const app = express();
const sequelize = require("./db");

const PORT = 8080;

app.use(express.json());
app.use(cors())
app.use(morgan(":method :url :status :response-time"));
app.use("/api", router);

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}... `);
    });
    console.log("Connection has been established successfully.");
    return;
  })
  .catch((err) => console.log("Unable to connect to the database:", err));
